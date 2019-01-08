import React, { Component } from "react";
import { firestore } from "../firebase/index";
import recipe from "../constants/recipes";
import { Store } from "../pockito/Store"
import { Prompt } from "react-router-dom"

//import FileUpload from "./FileUpload";


//TODO
//
//ADD FORM FOR RECIPE
//ADD EXPANDING LISTS FOR INGREDIENTS AND STEPS
//INTEGRATE WITH STORE

export class AddForm extends Component {
    constructor(props){
        super(props)
        Store.addListener(this.onStoreChange)
        this.state = {
            isBlocking: false,
            IngredientsLength: 2,
            IngredientsList: [],
            IngredientsAmountList: [],
            OptionalIngredientsList: [],
            IngredientsListRendered: false,
            StepsLength: 0,
            docID: this.props.docID,
            ...recipe
        }
    }

    onStoreChange = () => {
        this.forceUpdate()
    }

    componentWillUnmount() {
        Store.removeListener(this.onStoreChange)
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, isBlocking: true })
        console.log(`${event.target.name} = ${event.target.value}`)
    }

    handleIngredientLengthChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, IngredientsListRendered: false })
    }

    handleSubmit = () => {
        let IngredientArray = []
        let documentReference = [ "Recipes", "nG0JRhJANmBc2NuEpdOz", "UserRecipes", Store["docID"] ]
        let recipeFromState = {}

        for (let i = 0; i < this.state.IngredientsLength; i++){
            let currentIngredient = this.state["Ingredient" + i]
            IngredientArray.push(currentIngredient)
        }

        recipeFromState = {
            RecipeName: this.state.RecipeName,
            Description: "",
            Author: "",
            Ingredients: IngredientArray,
            IngredientsAmount: [],
            Steps: [],
            Time: 0,
            HasOptional: false,
            OptionalIngredients: [],
            OptionalSteps: []
        }

        firestore.updateStoreDataToFirestore(firestore.createFirestoreReference(documentReference), recipeFromState)
    }

    render() {
        const recipeCreated = Store["recipeCreated"]
        let IngredientsList;
        let IngredientsAmountList;
        let OptionalIngredientsList;

        if (this.state.IngredientsListRendered == false && recipeCreated == true){
            
            IngredientsList = [];
            IngredientsAmountList = [];
            OptionalIngredientsList = [];

            for ( let i = 0; i < this.state.IngredientsLength; i++ ){
                let ingredientID = "Ingredient" + i;
                IngredientsList.push(<InputField inputname={ingredientID} inputtype={"text"} inputvalue={this.state[ingredientID]} inputchange={this.handleChange}/>);
                let ingredientAmountID = "IngredientAmount" + i
                IngredientsAmountList.push(<InputField inputname={ingredientAmountID} inputtype={"text"} inputvalue={this.state[ingredientAmountID]} inputchange={this.handleChange}/>);
                let optionalIngredientID = "OptionalIngredient" + i
                OptionalIngredientsList.push(<InputField inputname={optionalIngredientID} inputtype={"checkbox"} inputvalue={this.state[optionalIngredientID]} inputchange={this.handleChange}/>);
            }
            this.setState({ IngredientsListRendered: true, IngredientsList: IngredientsList, IngredientsAmountList: IngredientsAmountList, OptionalIngredientsList: OptionalIngredientsList })
        }

        if(recipeCreated){
            return (
                <React.Fragment>
                <form>
                    <p>ID: {Store["docID"]}</p>
                    <p>Recipe Name</p>
                    <input name="RecipeName"
                        type="text"
                        value={this.state.RecipeName}
                        onChange={this.handleChange}>
                    </input>
                    <p>Ingredients:</p>
                    <input name="IngredientsLength"
                        type="tel"
                        value={this.state.IngredientsLength}
                        onChange={this.handleIngredientLengthChange}>
                    </input>
                    {this.state.IngredientsList}
                    {this.state.IngredientsAmountList}
                    {this.state.OptionalIngredientsList}
                </form>
                <button onClick={this.handleSubmit}>
                    Test Ingredients Array
                </button>
                <Prompt when={this.state.isBlocking} message="Are you sure you want to leave this page?"/>
                </React.Fragment>           
            )
        } else {
            return(null)
        }
    }
}

class InputField extends Component {
    render(){
        return (<React.Fragment>
            <p>{this.props.inputname}</p>
            <input name={this.props.inputname}
                type={this.props.inputtype}
                value={this.props.inputvalue}
                onChange={this.props.inputchange}>
            </input>
        </React.Fragment>)
    }
}
