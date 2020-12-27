import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import "./index.css";
type TerminalTextProps = {};
const TerminalText: FunctionComponent<TerminalTextProps> = () => {
  return (
    <div className="TerminalText-container">
      <div>
        <div className="header one">Hi, I'm Evan.</div>
        <div className="header two">Software Developer and Devops Engineer</div>
        <Link to="/resume">
          <div className="resume">Resume</div>
        </Link>
      </div>
    </div>
  );
};

export default TerminalText;
