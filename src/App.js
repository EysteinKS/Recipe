import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './css/App.css';

import Navigation from "./components/Navigation"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Add from "./pages/Add";
import Browse from "./pages/Browse";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import PasswordForget from "./components/auth/PasswordForget";
import * as routes from "./constants/routes";

import withAuthentication from "./components/auth/withAuthentication"
import { UserStore } from "./pockito/Store"
import { auth } from "./firebase/index"

import Radium from "radium";
import COLORS from "./css/DefaultColors"

const styles = {
  base: {
    background: COLORS.LightGray,
    height: "100vh"
  }
}

const App = ({ authUser }) => {

  if( authUser && UserStore["userLoaded"] === false ) {
    console.log("Loading user info from App.js")
    auth.loadCurrentUserToStore().then(() => { UserStore.set({ userLoaded: true }) })
  }

  return (
    <BrowserRouter>
      <div className="App" style={styles.base}>
        <Navigation/>
        <Route className="full-height" exact path={routes.HOME} component={() => <Home />} />
        <Route className="full-height" exact path={routes.PROFILE} component={() => <Profile />} />
        <Route className="full-height" exact path={routes.ADD} component={() => <Add />} />
        <Route className="full-height" exact path={routes.BROWSE} component={() => <Browse />} />
        <Route className="full-height" exact path={routes.SIGN_UP} component={() => <SignUp />} />
        <Route className="full-height" exact path={routes.SIGN_IN} component={() => <SignIn />} />
        <Route className="full-height" exact path={routes.PW_FORGET} component={() => <PasswordForget />} />
      </div>
    </BrowserRouter>
  )
}


export default withAuthentication(Radium(App));