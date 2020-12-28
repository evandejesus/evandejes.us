import React from "react";
import "./index.css";

const Resume = () => {
  return (
    <div className="Resume-container">
      <div className="Resume-content">
        <h1 className="header">Education</h1>
        <h2>Wayne State University</h2>
        <h3>Bachelor of Science in Computer Science</h3>
        <p>
          Detroit, MI
          <br />
          Transferred as of August 2019
          <br />
          Class of 2020
          <br />
          GPA: 3.62
        </p>
        <h2>Michigan Technological University</h2>
        <h3>Bachelor of Science in Computer Science</h3>
        <p>
          Houghton, MI
          <br />
          Attended from August 2016 - August 2019
          <br />
          GPA: 3.71
        </p>
        <h1 className="header">Certifications</h1>
        <ul>
          <li>
            Certified Kubernetes Application Developer - CKAD-2000-003288-0100
          </li>
        </ul>
        <h1 className="header">Experience</h1>
        <h1 className="header">Projects</h1>
        <h1 className="header">Skills & Software</h1>
      </div>
    </div>
  );
};
export default Resume;
