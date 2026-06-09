import { useState } from "react";
import './Assignment_4.css';

function remove() {
  const [num, setNum] = useState();
  const [array, setArray] = useState([]);
  return (
    <div id="ass4">
      <ul>
        {array.map((item, index) =>
          <li key={index}>{item} &nbsp;&nbsp;&nbsp;
            <button
              onClick={() => setArray(array.filter((item, i) => i !== index))}>
              Remove
            </button>

          </li>)
        }
      </ul>
      <label>Enter the number:   </label>
      <input type="number" value={num} onChange={(e) => setNum(e.target.value)}></input>
      <button onClick={() => {
        if (num != null) {
          setArray([...array, num])
          setNum("");
        }
      }}>Add</button>
    </div>
  )
}
export default remove;