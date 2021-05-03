import React, { FunctionComponent } from "react";
import "./index.css";
type TerminalTextProps = {};
const TerminalText: FunctionComponent<TerminalTextProps> = () => {
  return (
    <div className="TerminalText-container">
      <div className="TerminalText-content">
        <div className="header one">Hi, I'm Evan.</div>
        <div className="header two">Software Developer and Devops Engineer</div>
        <a className="resume" href="https://google.com">
          Resume
        </a>
      </div>
    </div>
  );
};

export default TerminalText;
