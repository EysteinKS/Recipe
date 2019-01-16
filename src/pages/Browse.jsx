import React, { Component } from "react";
import CreateRecipeButton from "../components/CreateRecipeButton"
import RecipeBrowser from "../components/RecipeBrowser"
import RecipeViewer from "../components/RecipeViewer"

//import things to get data from firebase

class Browse extends Component {
    render(){
        return(
            <div>
                <h1>Browse</h1>
                <RecipeBrowser/>
                <CreateRecipeButton/>
                <RecipeViewer/>
            </div>
        )
    }
}

export default Browse;