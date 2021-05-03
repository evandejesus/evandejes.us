import React, { FunctionComponent } from "react";
import "./index.css";
import resume from "../assets/resume.pdf";

type TerminalTextProps = {};
const TerminalText: FunctionComponent<TerminalTextProps> = () => {
  return (
    <div className="TerminalText-container">
      <div>
        <div className="header one">Hi, I'm Evan.</div>
        <div className="header two">Software Developer and Devops Engineer</div>
        <a className="resume" href={resume} target="_blank" rel="noreferrer">
          Resume
        </a>
      </div>
    </div>
  );
};

export default TerminalText;
