import React, { Component } from "react";
import { UserStore } from "../pockito/Store";
import AuthUserContext from "../components/auth/AuthUserContext";
import SignIn from "../components/auth/SignIn"
import SignOutButton from "../components/auth/SignOut"

class Profile extends Component {
    constructor(props){
        super(props)
        UserStore.addListener(this.onStoreUpdate);
    }

    onStoreUpdate = () =>
        this.forceUpdate()
    
    componentWillUnmount() {
        UserStore.removeListener(this.onStoreUpdate)
    }

    render(){
        return(
            <div>
                <h1>Profile</h1>
                <AuthUserContext.Consumer>
                {   authUser => authUser
                    ? <AuthProfile/>
                    : <SignIn/>
                }
                </AuthUserContext.Consumer>
            </div>
        )
    }
}

const AuthProfile = () => {

    return(
        <React.Fragment>
            <p>Username: {UserStore["username"]}</p>
            <SignOutButton/>
        </React.Fragment>
    )
}

/*const recipeList = () => {
    let list = []
    let obj = UserStore["recipes"]

    for (const key of Object.keys(obj)) {
        let name = obj[key].recipeName
        list.push(<p>{name}</p>)
    }
    return list
}*/

export default Profile;