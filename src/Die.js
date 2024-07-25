import React from "react"

function Die(props){
    const styles = {
        backgroundColor :  props.isHeld? "lightgreen" : "grey"
    }

    return(
        <div style = {styles} className="die" onClick = {props.toggleHeld}>{props.value}</div>
    )
}

export default Die;