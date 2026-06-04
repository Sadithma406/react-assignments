import { useState } from "react"
import "./Assignment_1.css";

function Assignment_1() {
    const [number, setNumber] = useState(0);
    const [sqrt, setSqrt] = useState(0);

    function ButtonClick() {
        setSqrt(Math.sqrt(number).toFixed(4));
    }
    return (
        <div className="content">
            <label>Enter the number:  </label>
            <input type="number" style={{ width: "300px" }} onChange={(e) => setNumber(e.target.value)} />&nbsp;&nbsp;&nbsp;
            <button onClick={ButtonClick}>Get Square Root</button>
            <br /><br /><br />
            <label>Square root:  </label>
            <input type="text" style={{ enable: false, width: "300px" }} value={sqrt} />
        </div>
    )
}

export default Assignment_1
