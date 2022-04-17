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

resource "random_string" "referer" {
  length  = 16
  special = false
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
    sid     = "Allow get requests originating from cloudfront"
    actions = ["s3:GetObject", "s3:GetObjectVersion"]
    effect  = "Allow"
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    resources = ["${aws_s3_bucket.this.arn}/*"]
    condition {
      test     = "StringLike"
      variable = "aws:Referer"

      values = [
        random_string.referer.result
      ]
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

  custom_error_response {
    error_caching_min_ttl = 10
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
  }


  origin {
    connection_attempts = 3
    connection_timeout  = 10
    domain_name         = "evandejes.us.s3-website-us-east-1.amazonaws.com"
    origin_id           = "cloudfront-distribution-origin-evandejes.us"

    custom_header {
      name  = "Referer"
      value = random_string.referer.result
    }

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "http-only"
      origin_read_timeout      = 30
      origin_ssl_protocols = [
        "TLSv1",
        "TLSv1.1",
        "TLSv1.2",
      ]
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