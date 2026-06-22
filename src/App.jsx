import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="application">
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textDecoration: 'underline' }}>REACT ASSIGNMENTS</h1>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <ul>
            <li><h2><Link to="/assignment_1" style={{ textDecoration: 'none', color: 'white' }}>Assignment 1</Link></h2></li>
            <li><h2><Link to="/assignment_2" style={{ textDecoration: 'none', color: 'white' }}>Assignment 2</Link></h2></li>
            <li><h2><Link to="/assignment_3" style={{ textDecoration: 'none', color: 'white' }}>Assignment 3</Link></h2></li>
            <li><h2><Link to="/assignment_4" style={{ textDecoration: 'none', color: 'white' }}>Assignment 4</Link></h2></li>
            <li><h2><Link to="/assignment_5" style={{ textDecoration: 'none', color: 'white' }}>Assignment 5</Link></h2></li>
            <li><h2><Link to="/assignment_6" style={{ textDecoration: 'none', color: 'white' }}>Assignment 6</Link></h2></li>
            <li><h2><Link to="/assignment_7" style={{ textDecoration: 'none', color: 'white' }}>Assignment 7</Link></h2></li>
            <li><h2><Link to="/assignment_8" style={{ textDecoration: 'none', color: 'white' }}>Assignment 8</Link></h2></li>
            <li><h2><Link to="/assignment_9" style={{ textDecoration: 'none', color: 'white' }}>Assignment 9</Link></h2></li>
            <li><h2><Link to="/assignment_10" style={{ textDecoration: 'none', color: 'white' }}>Assignment 10</Link></h2></li>
            <li><h2><Link to="/assignment_11" style={{ textDecoration: 'none', color: 'white' }}>Assignment 11</Link></h2></li>
            <li><h2><Link to="/assignment_12" style={{ textDecoration: 'none', color: 'white' }}>Assignment 12</Link></h2></li>
            <li><h2><Link to="/assignment_13" style={{ textDecoration: 'none', color: 'white' }}>Assignment 13</Link></h2></li>
            <li><h2><Link to="/assignment_14" style={{ textDecoration: 'none', color: 'white' }}>Assignment 14</Link></h2></li>
            <li><h2><Link to="/assignment_15" style={{ textDecoration: 'none', color: 'white' }}>Assignment 15</Link></h2></li>
            <li><h2><Link to="/assignment_16" style={{ textDecoration: 'none', color: 'white' }}>Assignment 16</Link></h2></li>
            <li><h2><Link to="/assignment_17" style={{ textDecoration: 'none', color: 'white' }}>Assignment 17</Link></h2></li>
            <li><h2><Link to="/assignment_18" style={{ textDecoration: 'none', color: 'white' }}>Assignment 18</Link></h2></li>
            <li><h2><Link to="/assignment_19" style={{ textDecoration: 'none', color: 'white' }}>Assignment 19</Link></h2></li>
            <li><h2><Link to="/assignment_20" style={{ textDecoration: 'none', color: 'white' }}>Assignment 20</Link></h2></li>

          </ul>
        </div>
      </section>

    </div>
  )
}

export default App
