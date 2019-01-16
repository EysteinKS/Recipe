import React, { Component } from "react";
import { Store } from "../pockito/Store"

const INITIAL_STATE = {
    recipeName: "",
    description: "",
    author: "",
    time: 0,
    ingredients: [],
    steps: [],
    recipeLoaded: false
}


class RecipeViewer extends Component {
    constructor(props){
        super(props)
        Store.addListener(this.onStoreUpdate)
        this.state = { ...INITIAL_STATE }
    }

    onStoreUpdate = () => {
        this.setState({
            recipeName: Store["recipeName"],
            description: Store["description"],
            author: Store["author"],
            time: Store["time"],
            ingredients: Store["ingredients"],
            steps: Store["steps"],
            recipeLoaded: true
        })
        this.forceUpdate()
    }

    componentDidMount() {
        this.setState({
            recipeName: Store["recipeName"],
            description: Store["description"],
            author: Store["author"],
            time: Store["time"],
            ingredients: Store["ingredients"],
            steps: Store["steps"],
            recipeLoaded: true
        })
    }

    componentWillUnmount(){
        Store.removeListener(this.onStoreUpdate)
    }

    render(){
        if(this.state.recipeLoaded){
            return(
                <section>
                    <h3>{this.state.recipeName}</h3>
                    <p>By: {this.state.author}</p>
                    <p>{this.state.description}</p>
                    <p>{this.state.time} Minutes</p>
                    <ul>
                    {this.state.ingredients.map((Ingredients) => 
                        <Ingredient ingredient={Ingredients.name} amount={Ingredients.amount}/>
                    )}
                    </ul>
                    <ol>
                    {this.state.steps.map((Steps) => 
                        <li>{Steps.step}</li>
                    )}
                    </ol>
                </section>
            )
        } else {
            return(null)
        }
    }
}

const Ingredient = props => {
    let { ingredient, amount } = props
    return(
        <li>
            <span>{amount} - </span>
            <span>{ingredient}</span>
        </li>
    )
}

export default RecipeViewer