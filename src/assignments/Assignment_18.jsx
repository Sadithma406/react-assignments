import { useState, useEffect } from 'react';
import './Assignment_18.css'

function colorGame() {
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [endMsg, setEndMsg] = useState("");

  function selectColor(color) {
    if (color !== colors[colors.length - 1]) {
      setGameOver(true);
      setEndMsg("Wrong Color!");
    }
    else {
      setScore(score + 1);
      setColors(prev => prev.slice(0, -1));

    }
  }


  useEffect(() => {
    const id = setInterval(() => {
      setColors(prev => {
        if (prev.length < 6) {
          return [Math.random() < 0.5 ? "red" : "blue", ...prev];
        }
        else {
          setGameOver(true);
          setEndMsg("Time-out!");
        }
        return prev;
      });
    }, 1000)
    return () => clearInterval(id);
  }, [])
  return (
    <div id="ass18">
      {!gameOver && <div className="game">
        <h1>Color Select Game</h1>
        <p>Target the right-most box</p>
        <div>Score: {score}</div>
        <div className="colorBox">
          {colors.length !== 0 ? <ul>
            {colors.map((color, index) => (
              <li style={{ backgroundColor: color, width: 50, height: 50, border: index == colors.length - 1 ? '3px solid black' : 'none' }} key={index}></li>
            ))}
          </ul> : <p>Loading Colors...</p>}
        </div>
        <button onClick={() => selectColor("red")} value="red">Red</button> &nbsp; &nbsp;
        <button onClick={() => selectColor("blue")} value="blue">Blue</button>
      </div>}
      {gameOver &&
        <div className="gameOver">
          <h1>Game Over</h1>
          <h3>{endMsg}</h3>
          <p>Score: {score}</p><br />
          <button onClick={() => window.location.reload()}>Try Again</button></div>}
    </div>
  )

}
export default colorGame;
