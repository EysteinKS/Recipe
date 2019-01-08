import React, { Component } from "react";
import { firestore } from "../firebase/index";
import { Store } from "../pockito/Store"
import { withRouter } from "react-router-dom"

class CreateRecipeButton extends Component {

    newRecipe = ( event ) => {
        const refArray = [ "Recipes", "nG0JRhJANmBc2NuEpdOz", "UserRecipes" ]
        const initRecipe = { RecipeName: "New Recipe", Description: "Edit to change content" }
        const firestoreRef = firestore.createFirestoreReference(refArray)
        firestore.addDocumentWithRandomID(firestoreRef, initRecipe, "Store", "docID").then(() => { 
            Store.set({ ["recipeCreated"]: true })
        })

        if(this.props.location.pathname !== "/add"){
            console.log("Pushing /add to history")
            this.props.history.push("/add")
        }
        
        event.preventDefault();
    }

    render(){
        return(
            <div className="AddContainer">
                <button onClick={this.newRecipe}>New Recipe</button>
            </div>
        )
    }
}

export default withRouter(CreateRecipeButton);