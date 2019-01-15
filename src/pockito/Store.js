import { Listenable } from "pockito";


export const Store = new Listenable({
    initialState: {
        recipeCreated: false,
        docID: ""
    }
})


export const UserStore = new Listenable({
    initialState: {
        username: "",
        permission: "",
        recipes: [],
        uid: "",
        userLoaded: false
    }
})