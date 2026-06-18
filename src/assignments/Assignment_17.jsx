import { useState } from 'react';
import './Assignment_17.css'



function mixing() {
  const [color1, setColor1] = useState("")
  const [color2, setColor2] = useState("")
  const [result, setResult] = useState("");

  function average(val1, val2) {
    let answer = Math.floor((val1 + val2) / 2);
    if (answer > 255) {
      answer = 255;
    }
    return answer
  }

  function toHex(color) {
    let hex = color.toString(16);
    if (hex.length < 2) {
      hex = "0" + hex
    }
    return hex;
  }

  function mixColors() {
    const hex1 = color1.slice(1);
    const hex2 = color2.slice(1);
    const r1 = parseInt(hex1.slice(0, 2), 16);
    const r2 = parseInt(hex2.slice(0, 2), 16);
    const g1 = parseInt(hex1.slice(2, 4), 16);
    const g2 = parseInt(hex2.slice(2, 4), 16);
    const b1 = parseInt(hex1.slice(4, 6), 16);
    const b2 = parseInt(hex2.slice(4, 6), 16);

    const r = average(r1, r2)
    const g = average(g1, g2)
    const b = average(b1, b2)

    const rHex = toHex(r);
    const gHex = toHex(g);
    const bHex = toHex(b);

    setResult(`#${rHex}${gHex}${bHex}`);
  }

  return (
    <div id="ass17">
      <div className="inputs">
        <input type="color" className="firstColor" value={color1} onChange={(e) => setColor1(e.target.value)}></input>
        <span>  +  </span>
        <input type="color" className="secColor" value={color2} onChange={(e) => setColor2(e.target.value)}></input>
        &nbsp; &nbsp;
        <button onClick={mixColors}>Mix</button> &nbsp; &nbsp;
        <div className="output" style={{ backgroundColor: result }}></div>
        <br />
      </div>
      <div className="gradient" style={{ background: `linear-gradient(${color1}, ${result}, ${color2})` }}></div>
    </div>
  )
}
export default mixing;