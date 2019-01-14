import React, { Component } from "react";

const initializeIngredient = () => ({
    name: "",
    amount: "",
    optional: false
})

class IngredientsForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            ingredients: []
        }
    }
  
    onAddIngredient = () => {
        this.setState(state => ({
            ingredients: state.ingredients.concat(initializeIngredient())
        }))
    }
  
    onRemoveIngredient = () => {
        this.setState(state => ({
            ingredients: state.ingredients.slice(0, -1)
        })) 
    }
  
    onChangeIngredient = (ingredient, index) => {
        this.setState(state => ({
            ingredients: []
                .concat(state.ingredients.slice(0, index))
                .concat(ingredient)
                .concat(state.ingredients.slice(index + 1))
        }))
    }
  
    render() {

        console.log(this.state)

        return (
            <div>
                <button onClick={this.onAddIngredient}>
                    Add ingredient
                </button>
                <button onClick={this.onRemoveIngredient}>
                    Remove ingredient
                </button>
  
                {this.state.ingredients.map((ingredient, index) =>
                    <IngredientContainer
                        ingredient={ingredient}
                        onChange={(changedIngredient) => this.onChangeIngredient(changedIngredient, index)}
                    />
                )}
            </div>
        );
    }
}

const IngredientContainer = (props) => {
    return(
        <React.Fragment>
            <input
                name="ingredientAmount"
                type="text"
                value={props.ingredient.amount}
                placeholder="Amount"
                onChange={(event) => props.onChange({ ...props.ingredient, amount: event.target.value })}
            />
            <input
                name="ingredientName"
                type="text"
                value={props.ingredient.name}
                placeholder="name"
                onChange={(event) => props.onChange({ ...props.ingredient, name: event.target.value })}
            />
            <input
                name="ingredientOptional"
                type="checkbox"
                value={props.ingredient.optional}
                onChange={(event) => props.onChange({ ...props.ingredient, optional: event.target.value })}
            />
        </React.Fragment>
    )
}

export default IngredientsForm;