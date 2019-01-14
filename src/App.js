import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './css/App.css';

import Navigation from "./components/Navigation"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Add from "./pages/Add";
import Browse from "./pages/Browse";
import * as routes from "./constants/routes";

import Radium from "radium";
import COLORS from "./css/DefaultColors"

const styles = {
  base: {
    background: COLORS.LightGray,
    height: "100vh"
  }
}

const App = () => {
  return (
    <BrowserRouter>
      <div className="App" style={styles.base}>
        <Navigation/>
        <Route className="full-height" exact path={routes.HOME} component={() => <Home />} />
        <Route className="full-height" exact path={routes.PROFILE} component={() => <Profile />} />
        <Route className="full-height" exact path={routes.ADD} component={() => <Add />} />
        <Route className="full-height" exact path={routes.BROWSE} component={() => <Browse />} />
      </div>
    </BrowserRouter>
  )
}


export default Radium(App);
