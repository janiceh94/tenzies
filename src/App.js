import React, { useState } from "react"
import Die from "./component/Die/Die"
import { nanoid } from "nanoid"

function App() {

  const [dice, setDice] = useState(allNewDice());

  function allNewDice(){
    const newDice = [];
    for(let i = 0; i < 10; i ++){
        newDice.push({
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid(),
        })
    }
    return newDice
  }

  function rollDice(){
    setDice(allNewDice())
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
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-btn" onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
