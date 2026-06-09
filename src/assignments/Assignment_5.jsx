import { useState } from "react";

function Assignment5() {
  const [num, setNum] = useState();
  const [array, setArray] = useState([]);
  const sort =dir => setArray([...array].sort((a, b) => (a - b) * dir));
  const filter = ()=>setArray(array.filter((item, i) => i !== index));

  return (
    <div id="ass5">
      <button onClick={() => sort(1)}>Sort Ascending</button>
      &nbsp;&nbsp;
      <button onClick={() => sort(-1)}>Sort Descending</button>
      <ul>
        {array.map((item, index) =>
          <li key={index}>{item} &nbsp;&nbsp;&nbsp;
            <button onClick={filter}> Remove </button>
            &nbsp;&nbsp;&nbsp;
            <button disabled={index === 0} onClick={() => {
              if (index > 0) {
                let prev = array[index - 1];
                let newArray = [...array];
                newArray[index - 1] = item;
                newArray[index] = prev;
                setArray(newArray);
              }
            }}>Move up</button>
            <button disabled={index === array.length - 1} onClick={() => {

                let next = array[index + 1];
                let newArray = [...array];
                newArray[index] = next;
                newArray[index + 1] = item;
                setArray(newArray);
              
            }}>Move Down</button>
          </li>)
        }
      </ul>
      <label>Enter the number:   </label>
      <input type="number" value={num} onChange={(e) => setNum(e.target.value)}></input>
      <button onClick={() => {
        if (num != null) {
          setArray([...array, num]);
          setNum("");
        }
      }}>Add</button>
    </div>
  )
}
export default Assignment5;