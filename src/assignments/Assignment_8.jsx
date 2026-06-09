import { useState } from "react";
import axios from 'axios';


function searching() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  function search() {
    axios.get(`https://apis.dnjs.lk/objects/colors.php?search=${query}`).then(
      response => { setResults(response.data) }
    )
      .catch(error => console.log(error))
  }

  return (
    <div id="ass8">
      <label>Enter the name of the color:  </label>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={search}>Search</button>

      <ul>
        {results.map((item, index) =>
          <li key={index}> {item.name}-{item.code} </li>)
        }
      </ul>
    </div>
  )
}
export default searching;
