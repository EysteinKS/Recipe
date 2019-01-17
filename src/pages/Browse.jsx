import React, { Component } from "react";
import CreateRecipeButton from "../components/CreateRecipeButton"
import RecipeBrowser from "../components/RecipeBrowser"
import RecipeViewer from "../components/RecipeViewer"
import Add from "./Add";
import { Store, UserStore } from "../pockito/Store"

//import things to get data from firebase

/*

TODO

Structure Browse with browser on top and modules that switch between editor and viewer
RecipeBrowser can fill whole screen when no module active, but get minimized otherwise

*/


class Browse extends Component {
    constructor(props){
        super(props)
        Store.addListener(this.onStoreUpdate)
        this.state = {
            fullHeightBrowser: true,
            showEditor: false,
            showViewer: true
        }
    }

    onStoreUpdate = () => {
        this.forceUpdate()
    }

    componentWillUnmount(){
        Store.removeListener(this.onStoreUpdate)
    }

    render(){
        let editor = Store["showEditor"]
        let viewer = Store["showViewer"]

        console.log(editor + "  " + viewer)

        if(editor){
            console.log("Showing Editor")
            editor = <Add/>
        }
        if(viewer){
            console.log("Showing Viewer")
            viewer = <RecipeViewer/>
        }

        return(
            <div>
                <h1>Browse</h1>
                <RecipeBrowser/>
                {editor}
                {viewer}
                <CreateRecipeButton/>
            </div>
        )
    }
}

export default Browse;