import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as routes from "../constants/routes";

class Navigation extends Component {
    render(){
        return(
            <header>
                <ul>
                    <li><Link to={routes.HOME}>Home</Link></li>
                    <li><Link to={routes.PROFILE}>Profile</Link></li>
                    <li><Link to={routes.ADD}>Add</Link></li>
                    <li><Link to={routes.BROWSE}>Browse</Link></li>
                </ul>
            </header>
        )
    }
}

export default Navigation;