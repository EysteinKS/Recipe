/*
TODO

Create different views for recipes
Select between the current user, favorite or all recipes
Sort by name, time, author, date added ++
Filter by tag


*/

import React, { Component } from "react"
import { Store } from "../pockito/Store"
import { UserStore } from "../pockito/Store"

const INITIAL_STATE = {
    view: "dropdown",
    sort: "",
    currentRecipe: Store["docID"],
    recipesList: {}
}

class RecipeBrowser extends Component {
    constructor(props){
        super(props)
        UserStore.addListener(this.onStoreUpdate)
        this.state = { ...INITIAL_STATE }
    }

    onStoreUpdate = () => {
        this.forceUpdate()
        this.setState({ recipesList: UserStore["recipes"] })
    }

    componentDidMount(){
        this.setState({ recipesList: UserStore["recipes"], currentRecipe: Store["docID"] })
    }

    componentWillUnmount(){
        UserStore.removeListener(this.onStoreUpdate)
    }

    onRecipeChange = (event) => {
        this.setState({ currentRecipe: event.target.value })
        changeActiveRecipe(event.target.value)
    }

    render(){

        let browserView;
        console.log(this.state)
        console.log(Store["docID"])

        switch(this.state.view){
            case("cards"):
                browserView = <CardList recipes={this.state.recipesList} onChange={this.onRecipeChange}/>
                break;
            case("dropdown"):
                browserView = <RecipeDropdown  value={this.state.currentRecipe} recipes={this.state.recipesList} onChange={this.onRecipeChange}/>
                break;
            default:
                break;
        }

        return(
            <section>
                {browserView}
                <p>{this.state.currentRecipe}</p>
            </section>
        )
    }
}

export const changeActiveRecipe = (newRecipe) => {
    console.log("Changing active recipe to " + newRecipe)
    Store.set({ docID: newRecipe })
    //Load data from recipe
}

const RecipeDropdown = props => {

    const recipeArray = Object.values(props.recipes)

    return(
        <select value={props.value} onChange={props.onChange}>
            {recipeArray.map((recipe) => 
                <option value={recipe.docID}>{recipe.recipeName}</option>
            )}
        </select>
    )
}

const RecipeCard = props => {
    return(
        <div>
            <img alt="photo" src={props.ImageURL}/>
            <p>{props.RecipeName}</p>
            <p>{props.Time}</p>
        </div>
    )
}

const CardList = props => {
    return(
    <div>
        {props.cards.map(card => (
            <RecipeCard {...card} />
        ))}
    </div>
    )
}

export default RecipeBrowser;