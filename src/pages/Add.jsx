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
        background: COLORS.Platinum,
        height: "100%",
        width: "100%",
        
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "25% 50% 25%"
    },
    gridItem: {
        gridColumnStart: 2
    },
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
            <div key="1" style={[styles.gridContainer, styles.base]}>
                <section key="2" style={[styles.light, styles.gridItem]}>
                    {Store["recipeCreated"] ? <FormContainer/> : <p>No recipe loaded</p> }
                    <CreateRecipeButton/>
                </section>
            </div>
        )
    }
}

export default Radium(Add);