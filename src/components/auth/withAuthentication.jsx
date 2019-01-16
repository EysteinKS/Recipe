import React from 'react';

import AuthUserContext from "./AuthUserContext";
import { firebase, auth } from "../../firebase/index";
import { UserStore } from "../../pockito/Store";

const withAuthentication = (Component) => {
    
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                authUser: null,
            }
        }
    
        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                if (authUser){
                    this.setState(() => ({ authUser }))
                    if(UserStore["userLoaded"] === false){
                        auth.loadCurrentUserToStore().then(() => { UserStore.set({ userLoaded: true }) })
                        console.log("Getting User data from Firestore")
                    }
                    UserStore.set({ isLoggedIn: true })
                } else {
                    this.setState(() => ({ authUser: null }))
                    UserStore.set({ isLoggedIn: false })
                }
            });
        }    

        render() {
            const { authUser } = this.state;

            return (
                <AuthUserContext.Provider value={authUser}>
                    <Component />
                </AuthUserContext.Provider>                
            );
        }
    }

    return WithAuthentication;
}

export default withAuthentication;