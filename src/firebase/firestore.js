import { firestore } from "./firebase";
import { Store } from "../pockito/Store";

export const createFirestoreReference = ( arr ) => {

    console.log("Creating Firestore Reference...")

    let reference = arr.join("/")

    /*for ( let i = 0; i < arr.length; i++){
        if ( i = arr.length - 2 ) {
            console.log(arr[i])
            reference = reference + arr[i]
            console.log(reference)
            i++
        } else {
            console.log(arr[i])
            reference = reference + arr[i] + "/"
            console.log(reference)
        }
    }
    reference = `${arr[0]}/${arr[1]}/${arr[2]}/${arr[3]}`
    */

    console.log("FirestoreReference is", reference)
    return reference
}

/* Example usage
const firestoreRefArray = [
    "Dictionary",
    "English",
    "Easy",
    "Word1"
]
const firebaseRef = firestore.createFirestoreReference( ...firestoreRefArray)
getFirestoreDataToStore(firebaseRef, "word", "Store", "currentWord" )
const currentWord = Store["currentWord"] //With listener
*/

export const getFirestoreDataToStore = ( refString, getVariable, storeRef, storeKey ) => {
    console.log("Getting Firestore data")

    firestore.doc(refString).get()
        .then((docRef) => {
            let thisDoc = docRef.data()
            let thisVariable = thisDoc[getVariable]

            if (storeKey) {
                setStoreData( storeRef, storeKey, thisVariable )
            } else {
                setStoreData( storeRef, getVariable, thisVariable )
            }
            console.log(`Imported ${getVariable} from ${refString} to ${storeRef}`)
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
            console.log(`Added ${getData} to ${refString} with docID${docRef.id}`)
            documentRef = docRef.id
            resolve(documentRef)
            setStoreData( storeRef, storeKey, docRef.id)
            console.log(`Saved ${docRef.id} to ${storeRef} with key ${storeKey}`)

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
    console.log(`Listener to ${refString} removed`)
}

export const deleteFirestoreData = (refString) => {
    firestore.doc(refString).delete()
        .then(() => {console.log("Deleted", refString)})
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