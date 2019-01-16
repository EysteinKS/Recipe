import React, { Component } from "react";
import SignInPage from "../components/auth/SignIn"
import AuthUserContext from "../components/auth/AuthUserContext";

class Home extends Component {
    render(){
        return(
            <div>
                <AuthUserContext.Consumer>
                {   authUser => authUser
                    ? <AuthHome/>
                    : <NonAuthHome/>
                }
                </AuthUserContext.Consumer>
            </div>
        )
    }
}

const NonAuthHome = () => {
    return(
        <SignInPage/>
    )
}

const AuthHome = () => {
    return(
        <h1>Home</h1>
    )
}

export default Home;