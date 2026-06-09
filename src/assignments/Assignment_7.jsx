import { useState, useEffect } from "react";
import axios from "axios";

function UsingAxios() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    axios.get("https://api.allorigins.win/raw?url=https://apis.dnjs.lk/objects/colors.php")
      .then(response => {
        console.log(response.data);
        setColors(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {colors.map((color, index) => (
          <li key={index}>
            {color.name} — {color.code}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsingAxios;