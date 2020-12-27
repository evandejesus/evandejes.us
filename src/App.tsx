import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import ExternalLink from "./ExternalLink";
import TerminalText from "./TerminalText";
import hamburger from "./assets/hamburger.png";
import close from "./assets/close.png";
import "./App.css";

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
    <Router>
      <Switch>
        <Route path="/resume"></Route>
        <Route path="/">
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
                  {isMenuShowing ? (
                    <img src={close} alt="x" />
                  ) : (
                    <img src={hamburger} alt="=" />
                  )}
                </div>
                <div className="App-links-wrapper">
                  <div className="App-links">
                    <MyLinks />
                  </div>
                </div>
              </div>
            </div>
            <div className="App-landing-page">
              <div className="App-landing-page-content">
                <TerminalText />
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
