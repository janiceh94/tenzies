import React, { useState, useEffect } from "react"
import Die from "./component/Die/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false)

  // check any changes for a winning condition
  useEffect(() => {
    // .every => look for a specific condition (boolean)
      // check every die, if every die isHeld is true
      // allHeld = true
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    // check all dice have the same value
    const sameValue = dice.every(die => die.value === firstValue)
    if (allHeld && sameValue){
      setTenzies(true)
      console.log("you won")
    }
  }, [dice])

  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    const newDice = [];
    for(let i = 0; i < 10; i ++){
        newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice(){
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? 
        die : generateNewDie()
    }))
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      // id die.id same as id paced in?
      return die.id === id ? 
        {
          ...die, 
          // update isHeld
          isHeld: !die.isHeld
          // or keep same object
        } : die
    }))  
  }

  const diceElements = dice.map(dieNum => (
    <Die 
      key={dieNum.id} 
      value={dieNum.value} 
      isHeld={dieNum.isHeld} 
      holdDice={() => holdDice(dieNum.id)}/>
    ))

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button 
        className="roll-btn" 
        onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
