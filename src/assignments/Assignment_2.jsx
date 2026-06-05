import { useState } from 'react'
import './Assignment_2.css'

function calculate() {
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [op, setOp] = useState("addition");
  const [answer, setAnswer] = useState();


  function calc() {
    if (op === "addition") {
      setAnswer(Number(num1) + Number(num2));
    }
    if (op === "subtraction") {
      setAnswer(Number(num1) - Number(num2));
    }
    if (op === "multiplication") {
      setAnswer(Number(num1) * Number(num2));
    }
    if (op === "division") {
      setAnswer(Number(num1) / Number(num2));
    }
  }
  return (
    <div id="ass2">
      <select onChange={(e) => { setOp(e.target.value); setAnswer(); }}>
        <option value="addition">Addition</option>
        <option value="subtraction">Subtraction</option>
        <option value="multiplication">Multiplication</option>
        <option value="division">Division</option>
      </select><br /><br />
      <label>First Number: </label>
      <input type="number" onChange={(e) => { setNum1(e.target.value); setAnswer(); }}></input>&nbsp;&nbsp;
      <label>Second Number: </label>
      <input type="number" onChange={(e) => { setNum2(e.target.value); setAnswer(); }}></input><br /><br />
      {num1 && num2 && < button onClick={() => { calc() }}>Show Answer </button>}
      {num1 && num2 && <p>Answer : {answer}</p>}
    </div>
  )
}
export default calculate