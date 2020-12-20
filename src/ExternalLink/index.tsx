import React, { FunctionComponent } from "react";
type ExternalLinkProps = { href: string; text: string };
const ExternalLink: FunctionComponent<ExternalLinkProps> = ({ href, text }) => {
  return (
    <a
      className="ExternalLink-link"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {text}
    </a>
  );
};

export default ExternalLink;
