import React, { useState } from "react"
import Die from "./component/Die/Die"

function App() {

  const [dice, setDice] = useState(allNewDice());

  function allNewDice(){
    const newDice = [];
    for(let i = 0; i < 10; i ++){
        newDice.push(Math.ceil(Math.random() * 6))
    }
    return newDice
  }

  function rollDice(){
    setDice(allNewDice())
  }

  const diceElements = dice.map(dieNum => <Die value={dieNum}/>)

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
