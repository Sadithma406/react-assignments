import { useState } from 'react';

function Styling() {
  const [style, setStyle] = useState([]);
  const [name, setName] = useState();
  const [value, setValue] = useState();
  const cssObject = style.reduce((obj, item) => ({
    ...obj, [item.name]: item.value
  }), {});

  function addStyle() {
    if (!name || !value) return;
    const newObj = { name: name, value: value };

    setStyle([...style, newObj]);

  }
  return (
    <div id="ass6">
      <label>Enter the name of the style:  </label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input><br />
      <label>Enter the value of the style:  </label>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)}></input><br />
      <button onClick={addStyle}>Add</button>


      <div>
        <ul>
          {style.map((item, index) =>
            <li key={index}>
              {JSON.stringify(item)} &nbsp;&nbsp;&nbsp;
              <button onClick={() => setStyle(style.filter((item, i) => i !== index))}>
                Remove
              </button>

            </li>
          )}

        </ul>
      </div><br /><br />
      <div style={{ height: '50px', border: '1px solid black' }}>
        <p style={cssObject}>Eg: This is a sample paragraph</p>
      </div>
    </div>
  )
}
export default Styling;