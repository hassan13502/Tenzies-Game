import "./App.css";
import Die from "./Die";
import React from "react";
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


function App() {
let[DieObj, setDieObj] = React.useState(randomArray())
const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(()=>{
    if(DieObj.every(obj => (obj.isHeld))){
      const value = DieObj[0].value
      DieObj.filter(obj => (obj.value === value)).length === 10 ?
      setTenzies(true)
      : console.log("Wrong solution")
    }
  },[DieObj])

  function generateDie(){
    return { value:  Math.floor(Math.random() * 6) + 1, isHeld: false, id : nanoid() }
  }

  function randomArray() {
    const randArr = new Array(10);
    for (let i = 0; i < randArr.length; i++) {
      randArr[i] = generateDie();
    }
    return randArr;
  }


  

  const Dies = DieObj.map((obj) => <Die toggleHeld = {() => holdDice(obj.id)} key = {obj.id} value={obj.value} isHeld={obj.isHeld} />)


  function holdDice(id){
    setDieObj(oldDice => oldDice.map(die => {
      return die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
  }))

    // setDieObj(prevobj => {
    //   if(id == prevobj.id)
    //     return {...prevobj,isHeld : !prevobj.isHeld}
    //   return prevobj
    // })
  }

  function handleChange() {
    setDieObj(oldDice => oldDice.map(die => {
      return die.isHeld ? 
          die :
          generateDie()
          
  }))
   
  }

  function reset(){
    setTenzies(false)
    setDieObj(randomArray)
  }

  return (
    <div className="App">
      {tenzies && <Confetti />}
      <div className="main-div">
        <div className="gameDiv">
        <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
          <div className="die-container">{Dies}</div>
          <input
            onClick={tenzies? reset : handleChange}
            className="roll-btn"
            type="button"
            value={tenzies? "Reset" : "Roll"}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
