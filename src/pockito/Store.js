import { Listenable } from "pockito";


export const Store = new Listenable({
    initialState: {
        recipeCreated: false,
        docID: "",
        recipeName: "",
        author: "",
        description: "",
        time: 0,
        ingredients: [],
        steps: []
    }
})

export const UserStore = new Listenable({
    initialState: {
        username: "",
        permission: "",
        recipes: {},
        uid: "",
        userLoaded: false,
        isLoggedIn: false
    }
})