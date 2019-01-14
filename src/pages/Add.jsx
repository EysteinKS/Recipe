import React, { Component } from "react";
import CreateRecipeButton from "../components/CreateRecipeButton"
import FormContainer from "../components/FormContainer"
import Radium from "radium";
import COLORS from "../css/DefaultColors"
import { Store } from "../pockito/Store"

const styles = {
    base: {
        background: COLORS.LightGray
    },
    light: {
        background: COLORS.Platinum
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "25% 50% 25%"
    },
    gridItem: {
        gridColumnStart: 2
    }
}

class Add extends Component {
    constructor(props){
        super(props)
        Store.addListener(this.storeUpdate)
    }

    storeUpdate = () => {
        this.forceUpdate()
    }

    componentWillUnmount() {
        Store.removeListener(this.storeUpdate)
    }

    render(){
        return(
            <div style={[styles.gridContainer, styles.base]}>
                <h1 style={styles.gridItem}>Add</h1>
                <section style={[styles.light, styles.gridItem]}>
                    {Store["recipeCreated"] ? <FormContainer/> : <p>Click to create a new recipe</p> }
                    <CreateRecipeButton/>
                </section>
            </div>
        )
    }
}

export default Radium(Add);