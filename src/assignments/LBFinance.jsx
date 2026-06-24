import { useState, useRef, useEffect } from "react"

const years = [2021, 2022, 2023, 2024, 2025, 2026]

function Range({ options, values, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isFirstClicked, setIsFirstClicked] = useState(false)

  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleCheck(year) {
    if (!isFirstClicked) {
      onChange({ from: year, to: year })
      setIsFirstClicked(true)
    } else {
      if (values.from > year) {
        const from = values.from
        onChange({ from: year, to: from })
      } else {
        onChange({ from: values.from, to: year })
      }
      setIsFirstClicked(false)
    }
  }

  function inRange(year) {
    if (year >= values.from && year <= values.to) {
      return true;
    }
    else {
      return false;
    }
  }

  return (
    <div ref={dropdownRef} style={{ width: 'fit-content', margin: '20px auto' }}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {`${values.from} - ${values.to}`}
      </button>

      {isOpen && (
        <div>
          <div style={{ width: '200px', margin: '20px auto' }}>
            {options.map((year) => (
              <div key={year}>
                <label>
                  <input type="checkbox" value={year} checked={inRange(year)} onChange={() => handleCheck(year)} />{year}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      <p style={{ margin: '30px' }}>From: {values.from} &nbsp; To: {values.to}</p>
    </div>
  )
}

function App() {
  const [values, setValues] = useState({ from: years[0], to: years[years.length - 1] })

  return (
    <div>
      <Range
        options={years}
        values={values}
        onChange={setValues}
      />
    </div>
  )
}

export default App