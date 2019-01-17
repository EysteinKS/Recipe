import React from "react";
import { firestore } from "../firebase/index";
import { Store, UserStore } from "../pockito/Store"
import recipe from "../constants/recipes"

const CreateRecipeButton = () => {

    let newRecipe = function(event) {
        const refArray = [ "Recipes", UserStore["uid"], "UserRecipes" ]
        const initRecipe = recipe
        const firestoreRef = firestore.createFirestoreReference(refArray)
        firestore.addDocumentWithRandomID(firestoreRef, initRecipe, "Store", "docID").then(() => { 
            firestore.updateUserRecipes(Store["docID"], "New Recipe")
            Store.set({ recipeCreated: true, showEditor: true })
        })
        
        event.preventDefault();
    }

    return(
        <div className="AddContainer">
            <button onClick={newRecipe}>New Recipe</button>
        </div>
    )
}

export default CreateRecipeButton