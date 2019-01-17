import React, { Component } from "react";
import { firestore } from "../firebase/index";
import { Store, UserStore } from "../pockito/Store";
import { Prompt } from "react-router-dom";

import "../css/FormContainer.css"

const initializeIngredient = () => ({
    name: "",
    amount: "",
    optional: false
})

const initializeStep = () => ({
    step: "",
    optional: false
})

class FormContainer extends Component {
    constructor(props){
        super(props)
        Store.addListener(this.onStoreChange)
        UserStore.addListener(this.onStoreChange)

        this.state = {
            ingredients: [],
            steps: [],
            recipeName: "",
            description: "",
            isBlocking: false
        }
    }

    onStoreChange = () => {
        this.forceUpdate()
    }

    componentWillUnmount() {
        Store.removeListener(this.onStoreChange)
        UserStore.removeListener(this.onStoreChange)
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value, isBlocking: true })
    }
  
    onAddIngredient = () => {
        this.setState(state => ({
            ingredients: state.ingredients.concat(initializeIngredient())
        }))
    }

    onAddStep = () => {
        this.setState(state => ({
            steps: state.steps.concat(initializeStep())
        }))
    }
  
    onRemoveIngredient = () => {
        this.setState(state => ({
            ingredients: state.ingredients.slice(0, -1)
        })) 
    }

    onRemoveStep = () => {
        this.setState(state => ({
            steps: state.steps.slice(0, -1)
        }))
    }
  
    onChangeIngredient = (ingredient, index) => {
        this.setState(state => ({
            ingredients: []
                .concat(state.ingredients.slice(0, index))
                .concat(ingredient)
                .concat(state.ingredients.slice(index + 1)), 
            isBlocking: true
        }))
        this.setState({  })
    }

    onChangeStep = (step, index) => {
        this.setState(state => ({
            steps: []
                .concat(state.steps.slice(0, index))
                .concat(step)
                .concat(state.steps.slice(index + 1)),
            isBlocking: true
        }))
    }

    handleSubmit = () => {
        let documentReference = [ "Recipes", UserStore["uid"], "UserRecipes", Store["docID"] ]
        let recipeFromState = {
            RecipeName: this.state.recipeName,
            Description: this.state.description,
            Author: UserStore["username"],
            Ingredients: this.state.ingredients,
            Steps: this.state.steps,
            Time: 0,
        }

        firestore.updateStoreDataToFirestore(firestore.createFirestoreReference(documentReference), recipeFromState)
        firestore.updateUserRecipes(Store["docID"], this.state.recipeName)
    }

    deleteRecipe = () => {
        let documentReference = [ "Recipes", UserStore["uid"], "UserRecipes", Store["docID"] ]
        firestore.deleteFirestoreData(firestore.createFirestoreReference(documentReference))
        firestore.removeUserRecipe(Store["docID"])
        Store.set({ recipeCreated: false })
    }
  
    render() {
        return (
            <div>
                <input 
                    name="recipeName"
                    type="text"
                    value={this.state.RecipeName}
                    onChange={this.handleChange}
                    placeholder="Name"
                />
                <input
                    name="description"
                    type="text"
                    value={this.state.description}
                    onChange={this.handleChange}
                    placeholder="Description"
                />
                <br/>


                {this.state.ingredients.map((ingredient, index) =>
                    <IngredientContainer
                        ingredient={ingredient}
                        onChange={(changedIngredient) => this.onChangeIngredient(changedIngredient, index)}
                    />
                )}

                <button onClick={this.onAddIngredient}>
                    Add ingredient
                </button>
                <button onClick={this.onRemoveIngredient}>
                    Remove ingredient
                </button>

                <br/>
                {this.state.steps.map((step, index) => 
                    <StepContainer 
                        steps={step}
                        onChange={(changedStep) => this.onChangeStep(changedStep, index)}
                    />
                )}

                <button onClick={this.onAddStep}>
                    Add step
                </button>
                <button onClick={this.onRemoveStep}>
                    Remove step
                </button>

                <br/>
                <button onClick={this.handleSubmit}>Save Recipe</button>
                <button onClick={this.deleteRecipe}>Delete Recipe</button>
                <Prompt when={this.state.isBlocking} message="Are you sure you want to leave this page?"/>
            </div>
        );
    }
}

const IngredientContainer = (props) => {
    const { ingredient, onChange } = props;

    return(
        <div className="ingredientGrid">
            <input
                name="ingredientAmount"
                className="gridItemA"
                type="text"
                value={ingredient.amount}
                placeholder="Amount"
                onChange={(event) => onChange({ ...ingredient, amount: event.target.value })}
            />
            <input
                name="ingredientName"
                className="gridItemB"
                type="text"
                value={ingredient.name}
                placeholder="name"
                onChange={(event) => onChange({ ...ingredient, name: event.target.value })}
            />
            <input
                name="ingredientOptional"
                className="gridItemC"
                type="checkbox"
                value={ingredient.optional}
                onChange={(event) => onChange({ ...ingredient, optional: !ingredient.optional })}
            />
        </div>
    )
}

const StepContainer = (props) => {
    const { steps, onChange } = props;

    return(
        <div className="stepGrid">
            <input
                name="step"
                className="gridItemA"
                type="text"
                value={steps.step}
                placeholder="Step"
                onChange={(event) => onChange({ ...steps, step: event.target.value })}
            />
            <input
                name="stepOptional"
                className="gridItemB"
                type="checkbox"
                value={steps.optional}
                onChange={() => onChange({ ...steps, optional: !steps.optional })}
            />
        </div>
    )
}

export default FormContainer;