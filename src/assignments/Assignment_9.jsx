import { useState } from 'react';
import axios from 'axios';

function pageLimit() {
  const [color, setColor] = useState("");
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState({ data: [], total: 0 });
  let pages = Math.ceil(results.total / limit);


  function search(targetPage) {
    axios.get(`https://apis.dnjs.lk/objects/colors.php?search=${color}&page=${targetPage}&limit=${limit}`).then(
      response => {
        setResults(response.data);
        setPage(targetPage);

      }
    )
      .catch(error => console.log(error))
  }
  return (
    <div id="ass9">
      <label>Color:  </label>
      <input type="text" onChange={(e) => setColor(e.target.value)}></input>
      <label>Page number:  </label>
      <input type="number" onChange={(e) => setPage(Number(e.target.value))} ></input>
      <label>Limit per page:  </label>
      <input type="number" onChange={(e) => setLimit(Number(e.target.value))}></input>
      <button onClick={() => search(page)}>Search</button><br /><br /><br />
      <ul>
        {results.data.map((item, index) =>
          <li key={index}> {item.name}-{item.code} </li>)
        }
      </ul>
      <div>
        {Array.from({ length: pages }, (_, i) => i + 1).map((page) => {
          return <button key={page} onClick={() => search(page)}>{page}</button>
        })}
      </div>  
    </div>
  )

}
export default pageLimit;