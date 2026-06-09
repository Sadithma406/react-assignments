import { useState, useEffect } from 'react'
import './Assignment_2.css'

function calculate() {
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [op, setOp] = useState("addition");
  const [answer, setAnswer] = useState();

  const a = Number(num1);
  const b = Number(num2);

  useEffect(() => { setAnswer("") }, [num1, num2, op])

  function calc() {
    if (op === "addition") {
      setAnswer(a + b);
    }
    if (op === "subtraction") {
      setAnswer(a - b);
    }
    if (op === "multiplication") {
      setAnswer(a * b);
    }
    if (op === "division") {
      setAnswer(a / b);
    }
  }
  return (
    <div id="ass2">
      <select onChange={(e) => setOp(e.target.value)}>
        <option value="addition">Addition</option>
        <option value="subtraction">Subtraction</option>
        <option value="multiplication">Multiplication</option>
        <option value="division">Division</option>
      </select>
      <br /><br />
      <label>First Number: </label>
      <input type="number" onChange={(e) => setNum1(e.target.value)}></input>
      &nbsp;&nbsp;
      <label>Second Number: </label>
      <input type="number" onChange={(e) => setNum2(e.target.value)}></input>
      <br /><br />
      {num1 && num2 && <button onClick={calc}>Show Answer </button>}
      {num1 && num2 && <p>Answer : {answer}</p>}
    </div>
  )
}
export default calculate