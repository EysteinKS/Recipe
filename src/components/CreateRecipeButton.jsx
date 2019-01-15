import React from "react";
import { firestore } from "../firebase/index";
import { Store, UserStore } from "../pockito/Store"
import { withRouter } from "react-router-dom"

const CreateRecipeButton = (props) => {

    let newRecipe = function(event) {
        const refArray = [ "Recipes", UserStore["uid"], "UserRecipes" ]
        const initRecipe = { RecipeName: "New Recipe", Description: "Edit to change content" }
        const firestoreRef = firestore.createFirestoreReference(refArray)
        firestore.addDocumentWithRandomID(firestoreRef, initRecipe, "Store", "docID").then(() => { 
            Store.set({ recipeCreated: true })
        })

        if(props.location.pathname !== "/add"){
            console.log("Pushing /add to history")
            props.history.push("/add")
        }
        
        event.preventDefault();
    }

    return(
        <div className="AddContainer">
            <button onClick={newRecipe}>New Recipe</button>
        </div>
    )
}

export default withRouter(CreateRecipeButton);