import React, { Component } from "react";
import CreateRecipeButton from "../components/CreateRecipeButton"

//import things to get data from firebase

class Browse extends Component {
    render(){
        return(
            <div>
                <h1>Browse</h1>
                <CreateRecipeButton/>
            </div>
        )
    }
}

export default Browse;