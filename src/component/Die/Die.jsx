import React from "react"
import "./Die.css"

export default function Die(props){

    function allNewDice(){
        const newDice = [];
        for(let i = 0; i < 10; i ++){
            newDice.push(Math.ceil(Math.random() * 6))
        }
        return newDice
    }

    return (
        <div className="die-face">
            <h2 className="die-number">{props.value}</h2>
        </div>
    )
}