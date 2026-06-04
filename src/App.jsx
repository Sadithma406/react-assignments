import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textDecoration: 'underline' }}>REACT ASSIGNMENTS</h1>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <ul>
            <li><h2><Link to="/assignment_1" style={{ textDecoration: 'none' }}>Assignment 1</Link></h2></li>
          </ul>
        </div>
      </section>

    </>
  )
}

export default App
