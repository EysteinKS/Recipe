import React, { Component } from "react";
import CreateRecipeButton from "../components/CreateRecipeButton"
import RecipeBrowser from "../components/RecipeBrowser"

//import things to get data from firebase

class Browse extends Component {
    render(){
        return(
            <div>
                <h1>Browse</h1>
                <RecipeBrowser/>
                <CreateRecipeButton/>
            </div>
        )
    }
}

export default Browse;