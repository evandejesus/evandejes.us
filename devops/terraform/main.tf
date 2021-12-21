provider "aws" {
  region  = "us-east-1"
  profile = "evan"
}

locals {
  domain    = "evandejes.us"
  origin_id = "cloudfront-distribution-origin-${local.domain}"
  tags = {
    Terraform = true
  }
}

/* S3 */
resource "aws_s3_bucket" "this" {
  bucket        = local.domain
  tags          = local.tags
  acl           = "public-read"
  force_destroy = false

  website {
    index_document = "index.html"
  }

  versioning {
    enabled = false
  }
}

# S3 bucket policy. Grants public read access to CloudFront's OAI
# Use the policy document data source to dynamically create an IAM policy. Users can pass in overrides.
# Use the replace() function to replace the key word 'this' with the arn of the bucket. This is required to stop a dependency loop.
data "aws_iam_policy_document" "this" {

  statement {
    sid       = "AllowSSLRequestsOnly"
    actions   = ["s3:*"]
    effect    = "Deny"
    resources = [aws_s3_bucket.this.arn, "${aws_s3_bucket.this.arn}/*"]
    condition {
      test     = "Bool"
      variable = "aws:SecureTransport"
      values   = ["false"]
    }
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }

  statement {
    sid       = "s3StaticHostingPolicy"
    actions   = ["s3:GetObject"]
    effect    = "Allow"
    resources = ["${aws_s3_bucket.this.arn}/*"]
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.this.iam_arn]
    }
  }

}

# Create actual IAM policy from IAM document data source.
resource "aws_s3_bucket_policy" "this" {
  bucket = aws_s3_bucket.this.id
  policy = data.aws_iam_policy_document.this.json
}


/* CERT */
resource "aws_acm_certificate" "this" {
  domain_name       = local.domain
  validation_method = "DNS"
  tags              = local.tags

  lifecycle {
    create_before_destroy = true
  }
}

# Validation step. So other TF resources know when the validation step is complete
resource "aws_acm_certificate_validation" "this" {
  certificate_arn = aws_acm_certificate.this.arn
}


/* CLOUDFRONT */
resource "aws_cloudfront_origin_access_identity" "this" {
  comment = "OAI for ${aws_s3_bucket.this.bucket_regional_domain_name}"
}

resource "aws_cloudfront_distribution" "this" {
  comment             = "CDN for ${local.domain}"
  aliases             = [local.domain]
  enabled             = true
  is_ipv6_enabled     = false
  http_version        = "http2"
  default_root_object = "index.html"
  tags                = local.tags

  # Primary Origin
  origin {
    domain_name = aws_s3_bucket.this.bucket_regional_domain_name
    # Origins and group origins can't have the same ID.
    origin_id = local.origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.this.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    target_origin_id       = local.origin_id
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    default_ttl            = 0
    max_ttl                = 0
    min_ttl                = 0
    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      headers = [
        "Access-Control-Request-Headers",
        "Access-Control-Request-Method",
        "Origin"
      ]
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.this.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2018"
  }

}

/* ROUTE53 */

resource "aws_route53_zone" "this" {
  name = local.domain
  tags = local.tags

}

resource "aws_route53_record" "ns" {
  zone_id = aws_route53_zone.this.zone_id
  records = [
    "ns-1059.awsdns-04.org.",
    "ns-1966.awsdns-53.co.uk.",
    "ns-52.awsdns-06.com.",
    "ns-900.awsdns-48.net.",
  ]

  name = local.domain
  type = "NS"
  ttl  = "172800"

}

resource "aws_route53_record" "this" {
  zone_id = aws_route53_zone.this.zone_id

  alias {
    name                   = aws_cloudfront_distribution.this.domain_name
    zone_id                = aws_cloudfront_distribution.this.hosted_zone_id
    evaluate_target_health = true
  }

  name = local.domain
  type = "A"

}

resource "aws_route53_record" "cert" {
  for_each = {
    for dvo in aws_acm_certificate.this.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.this.zone_id
}