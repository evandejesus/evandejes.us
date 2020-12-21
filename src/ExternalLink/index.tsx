import React, { FunctionComponent } from "react";
type ExternalLinkProps = { href: string; text: string };
const ExternalLink: FunctionComponent<ExternalLinkProps> = ({ href, text }) => {
  const [pink, setPink] = React.useState(false);
  return (
    <a
      onTouchStart={() => {
        setPink(true);
      }}
      onTouchEnd={() => {
        setPink(false);
      }}
      className="ExternalLink-link"
      style={{ color: pink ? "#ef7997" : "FFF" }}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {text}
    </a>
  );
};

export default ExternalLink;
