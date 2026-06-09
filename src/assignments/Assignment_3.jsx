import { useState } from 'react';
import './Assignment_3.css';

function toggle() {
  const [num, setNum] = useState(0);
  const [array1, setArray1] = useState([]);
  const total = array1.reduce((a, b) => Number(a) + Number(b), 0);
  const avg = array1.length > 0 ? total / array1.length : 0;

  return (
    <div id="ass3">
      <label style={{ textAlign: "left" }}>Total: {total}</label>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <label style={{ textAlign: "left" }}>Average: {avg}</label>
      <ul>
        {array1.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <label>Enter the number:  </label>
      <input type="number" value={num} onChange={(e) => setNum(e.target.value)} />&nbsp;&nbsp;
      <button onClick={() => {setArray1([...array1, num]);setNum("")}}>Add</button><br /><br />
    </div>
  )
}

export default toggle;