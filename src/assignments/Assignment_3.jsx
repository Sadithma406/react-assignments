import { useState } from 'react';
import './Assignment_3.css';

function toggle() {
  const [num, setNum] = useState(0);
  const [array1, setArray1] = useState([]);

  return (
    <div id="ass3">
      <label style={{ textAlign: "left" }}>Total: {array1.reduce((a, b) => Number(a) + Number(b), 0)}</label>&nbsp;&nbsp;&nbsp;&nbsp;
      {array1.length > 0 ? <label style={{ textAlign: "left" }}>Average: {array1.reduce((a, b) => Number(a) + Number(b), 0) / array1.length}</label> : <label style={{ textAlign: "left" }}>Average: 0</label>}
      <ul>
        {array1.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <label>Enter the number:  </label>
      <input type="number" onChange={(e) => setNum(e.target.value)} />&nbsp;&nbsp;
      <button onClick={() => setArray1([...array1, num])}>Add</button><br /><br />
    </div>
  )
}

export default toggle;