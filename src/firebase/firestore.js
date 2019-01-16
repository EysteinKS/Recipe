import { firestore } from "./firebase";
import { Store, UserStore } from "../pockito/Store";

export const createFirestoreReference = ( arr ) => {

    let reference = arr.join("/")
    return reference
}

export const getFirestoreDataToStore = ( refString, getVariable, storeRef, storeKey ) => {

    firestore.doc(refString).get()
        .then((docRef) => {
            let thisDoc = docRef.data()
            let thisVariable = thisDoc[getVariable]

            if (storeKey) {
                setStoreData( storeRef, storeKey, thisVariable )
            } else {
                setStoreData( storeRef, getVariable, thisVariable )
            }
        })
        
        .catch((error) => console.log(`Error while importing ${getVariable} from ${refString}:`, error))

    if (storeKey){
        //return getStoreData( storeRef, storeKey )
    } else {
        //return getStoreData( storeRef, getVariable )
    }
}

export const addDocumentWithRandomID = ( refString, getData, storeRef, storeKey ) => new Promise((resolve)=> {
    let documentRef = "";

    firestore.collection(refString).add(getData)
        .then((docRef) => { 
            documentRef = docRef.id
            resolve(documentRef)
            setStoreData( storeRef, storeKey, docRef.id)

        })
        .catch((error) => console.log("Error adding document with Random ID", error))
    
})

export const setDataToFirestore = ( refString, setVariable ) => {

    firestore.doc(refString).set(setVariable)
        .then(() => {console.log(`${setVariable} set to ${refString}`)})
        .catch((error) => console.log("Error setting data in Firestore", error))
}

export const updateStoreDataToFirestore = (refString, updateVariable) => {
    firestore.doc(refString).update(updateVariable)
        .then(() => {console.log(`${updateVariable} set to ${refString}`)})
        .catch((error) => console.log("Error updating data in Firestore", error))
}

export const addListenerToFirestore = (refString, getVariable, storeRef, storeKey ) => {
    firestore.doc(refString).onSnapshot((docRef) => {
        //setStoreData(storeRef, storeKey, docRef[getVariable])
    })
}

export const removeListenerFromFirestore = (refString) => {
    firestore.doc(refString).onSnapshot((docRef) => {})
}

export const deleteFirestoreData = (refString) => {
    firestore.doc(refString).delete()
}

export const setStoreData = ( storeRef, storeKey, newData ) => {
    switch(storeRef){
        case("Store"):
            Store.set({[storeKey]: newData})
            break;
        default:
            break;
    }
}

export const getStoreData = ( storeRef, storeKey) => {
    switch(storeRef){
        case("Store"):
            //return Store[storeKey]
            break;
        case("UserStore"):
            //return UserStore[storeKey]
            break;
        case("SessionStore"):
            //return SessionStore[storeKey]
            break;
        default:
            console.log("Error, didn't find storeRef case in getStoreData switch")
            break;
    }
}

//CHANGING USER INFO

export const updateUserRecipes = (newRecipeID, newRecipeName) => {
    let currentRecipes = UserStore["recipes"]
    let currentUser = UserStore["uid"]
    let documentReference = ["Users", currentUser]
    let newRecipe = { docID: newRecipeID, recipeName: newRecipeName }
    let objectToSave = { ...currentRecipes, [newRecipeID]: newRecipe }
    updateStoreDataToFirestore(createFirestoreReference(documentReference), {recipes: objectToSave})
    UserStore.set({ recipes: objectToSave })
}

export const removeUserRecipe = (recipeID) => {
    let currentRecipes = UserStore["recipes"]
    let currentUser = UserStore["uid"]
    let documentReference = ["Users", currentUser]
    let recipesWithoutID = removeKeyFromObject(currentRecipes, recipeID)
    updateStoreDataToFirestore(createFirestoreReference(documentReference), {recipes: recipesWithoutID})
    UserStore.set({ recipes: recipesWithoutID })
}

const removeKeyFromObject = (obj, prop) => {
    let {[prop]: omit, ...res} = obj
    return res
}

//RECIPES

export const loadRecipeFromFirestore = (recipeOwner, recipeID) => {
    let documentReference = createFirestoreReference([ "Recipes", recipeOwner, "UserRecipes", recipeID ])
    firestore.doc(documentReference).get()
        .then((snapshot)=> {
            let docData = snapshot.data()
            Store.set({
                recipeName: docData.RecipeName,
                author: docData.Author,
                description: docData.Description,
                time: docData.Time,
                ingredients: docData.Ingredients,
                steps: docData.Steps
            })
        })
        .catch((error) => console.log(error))
}