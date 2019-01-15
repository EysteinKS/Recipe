import React, { Component } from "react";
import { UserStore } from "../pockito/Store";

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
                <p>User ID: {UserStore["uid"]}</p>
            </div>
        )
    }
}

export default Profile;