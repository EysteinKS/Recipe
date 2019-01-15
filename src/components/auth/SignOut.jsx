import React from "react";
import { auth } from "../../firebase/index"
import * as routes from '../../constants/routes'
import { Link } from "react-router-dom"

const SignOutButton = () =>
    <button type="button" onClick={auth.doSignOut}>        
        <Link to={routes.HOME}>Sign Out</Link>
    </button>

export default SignOutButton;