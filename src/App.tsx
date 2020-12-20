import React from "react";
import ExternalLink from "./ExternalLink";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="App-navigation-wrapper">
        <div className="App-navigation">
          <div className="App-title">
            <div>Evan de Jesus</div>
          </div>
          <div className="App-links-wrapper">
            <div className="App-links">
              <ExternalLink href="https://github.com/ejdejesu" text="GitHub" />
              <ExternalLink
                href="https://www.instagram.com/evandejesus_"
                text="Instagram"
              />
              <ExternalLink href="https://ko-fi.com/evandejesus" text="Ko-fi" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
