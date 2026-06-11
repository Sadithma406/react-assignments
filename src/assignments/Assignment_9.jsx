import { useState } from 'react';
import axios from 'axios';

function pageLimit() {
  const [color, setColor] = useState("");
  const [limit, setLimit] = useState(0);
  const [page, setPage] = useState(0);
  const [results, setResults] = useState({ data: [], total: 0 });
  const [alerts, setAlerts] = useState("");
  const [pages, setPages] = useState(0);
  const [active, setActive] = useState(0);


  function search(targetPage) {

    axios.get(`https://apis.dnjs.lk/objects/colors.php?search=${color}&page=${targetPage}&limit=${limit}`).then(
      response => {
        if (limit < 1) {
          setAlerts("Limit must be at least 1");
          return;
        }
        setAlerts("");
        setResults(response.data);
        setPage(targetPage);
        setPages(Math.ceil(response.data.total / limit));

      }
    )
      .catch(error => console.log(error))
  }
  return (
    <div id="ass9">
      <label>Color:  </label>
      <input type="text" onChange={(e) => setColor(e.target.value)}></input>
      <label>Limit per page:  </label>
      <select onChange={(e) => setLimit(Number(e.target.value))}>
        <option></option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
        <option value='8'>8</option>
        <option value='9'>9</option>
        <option value='10'>10</option>
      </select>
      <button onClick={() => { search(1), setActive(1) }}>Search</button><br /><br /><br />
      <br /><p style={{ color: 'red' }}>{alerts}</p>
      <ul>
        {results.data.map((item, index) =>
          <li key={index}> {item.name}-{item.code} </li>)
        }
      </ul>
      <div>
        {Array.from({ length: pages }, (_, i) => i + 1).map((page) => {
          return <button style={{ backgroundColor: page === active ? 'yellow' : 'gray' }} key={page} onClick={() => { search(page), setActive(page) }}>{page}</button>
        })}
      </div>
    </div>
  )

}
export default pageLimit;