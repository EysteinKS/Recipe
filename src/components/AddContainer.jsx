import React, { Component } from "react";
import { firestore } from "../firebase/index";
import recipe from "../constants/recipes";
import { Store } from "../pockito/Store"
import { Prompt } from "react-router-dom"

import "../css/AddContainer.css"

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
    }

    //Makes checkbox true if undefined, otherwise switches between true and false
    handleCheck = (event) => {
        let checkboxtype = typeof this.state[event.target.name]
        if (checkboxtype === "undefined") {
            this.setState({ [event.target.name]: true, isBlocking: true })
        } else {
            this.setState({ [event.target.name]: !this.state[event.target.name], isBlocking: true })
        }
    }

    handleIngredientLengthChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, IngredientsListRendered: false })
    }

    handleSubmit = () => {
        let IngredientArray = []
        let IngredientAmountArray = []
        let OptionalIngredientArray = []
        let documentReference = [ "Recipes", "nG0JRhJANmBc2NuEpdOz", "UserRecipes", Store["docID"] ]
        let recipeFromState = {}

        for (let i = 0; i < this.state.IngredientsLength; i++){
            let currentIngredient = this.state["Ingredient" + i]
            let currentIngredientAmount = this.state["IngredientAmount" + i]
            let currentOptionalIngredient = this.state["OptionalIngredient" + i]

            IngredientArray.push(currentIngredient)
            IngredientAmountArray.push(currentIngredientAmount)
            OptionalIngredientArray.push(currentOptionalIngredient)
        }

        recipeFromState = {
            RecipeName: this.state.RecipeName,
            Description: "",
            Author: "",
            Ingredients: IngredientArray,
            IngredientsAmount: IngredientAmountArray,
            Steps: [],
            Time: 0,
            HasOptional: false,
            OptionalIngredients: OptionalIngredientArray,
            OptionalSteps: []
        }

        firestore.updateStoreDataToFirestore(firestore.createFirestoreReference(documentReference), recipeFromState)
    }

    deleteRecipe = () => {
        let documentReference = [ "Recipes", "nG0JRhJANmBc2NuEpdOz", "UserRecipes", Store["docID"] ]
        firestore.deleteFirestoreData(firestore.createFirestoreReference(documentReference))
        Store.set({ recipeCreated: false })
    }

    render() {

        const recipeCreated = Store.recipeCreated;
        let IngredientsList;

        if (this.state.IngredientsListRendered === false && recipeCreated === true){
            IngredientsList = [];

            for ( let i = 0; i < this.state.IngredientsLength; i++ ){
                let ingredientID = "Ingredient" + i;
                let ingredientAmountID = "IngredientAmount" + i
                let optionalIngredientID = "OptionalIngredient" + i
                this.setState({ [optionalIngredientID]: false })

                IngredientsList.push(
                <li className="ingredientContainer">
                    <InputField
                        css={"gridItemA2"}
                        textcss={"gridItemA1"}
                        inputtext={"Amount"} 
                        inputname={ingredientAmountID} 
                        inputtype={"text"} 
                        inputvalue={this.state[ingredientAmountID]} 
                        inputchange={this.handleChange}
                    />
                    <InputField
                        css={"gridItemB2"}
                        textcss={"gridItemB1"}
                        inputtext={"Ingredient"} 
                        inputname={ingredientID} 
                        inputtype={"text"} 
                        inputvalue={this.state[ingredientID]} 
                        inputchange={this.handleChange}
                    />
                    <InputField
                        css={"gridItemC2"}
                        textcss={"gridItemC1"}
                        inputtext={"Optional?"}
                        inputname={optionalIngredientID} 
                        inputtype={"checkbox"} 
                        inputvalue={this.state[optionalIngredientID]} 
                        inputchange={this.handleCheck}                        
                    />
                </li>);
            }
            this.setState({ IngredientsListRendered: true, IngredientsList: IngredientsList })
        }

        //console.log(this.state)

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
                    <ul className="recipeList">{this.state.IngredientsList}</ul>
                </form>
                <button onClick={this.handleSubmit}>
                    Test Ingredients Array
                </button>
                <button onClick={this.deleteRecipe}>Delete Recipe</button>
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
            <p className={this.props.textcss}>{this.props.inputtext}</p>
            <input className={this.props.css}
                name={this.props.inputname}
                type={this.props.inputtype}
                value={this.props.inputvalue}
                onChange={this.props.inputchange}>
            </input>
        </React.Fragment>)
    }
}
