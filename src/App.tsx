import React from "react";
import ExternalLink from "./ExternalLink";
import "./App.css";
import hamburger from "./assets/hamburger.png";

const MyLinks = () => {
  return (
    <>
      <ExternalLink href="https://github.com/ejdejesu" text="GitHub" />
      <ExternalLink
        href="https://www.instagram.com/evandejesus_"
        text="Instagram"
      />
      <ExternalLink href="https://ko-fi.com/evandejesus" text="Ko-fi" />
    </>
  );
};

const App = () => {
  const [isMenuShowing, setShowMenu] = React.useState(false);

  const toggleMenu = () => setShowMenu((m) => !m);

  return (
    <div className="App">
      {isMenuShowing && (
        <>
          <div className="App-hamburger-background"></div>
          <div className="App-hamburger-menu">
            <MyLinks />
          </div>
        </>
      )}
      <div className="App-navigation-wrapper">
        <div className="App-navigation">
          <div className="App-title">
            <div>Evan de Jesus</div>
          </div>
          <div className="App-hamburger" onClick={toggleMenu}>
            <img src={hamburger} alt="hamburger" />
          </div>
          <div className="App-links-wrapper">
            <div className="App-links">
              <MyLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
