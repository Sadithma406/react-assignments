import { useState } from "react";
import axios from "axios";
import userImg from '../assets/user.jpg';
import './Assignment_11.css';

function Authorization() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);

  async function handleLogin() {

    try {
      const response = await axios.post(`${baseURL}/login`, {
        email,password
      })
      console.log(response.data);
      const token = response.data.access_token;
      setMsg("Successfully logged in");
     axios.get(`${baseURL}/user`,{headers:{Authorization: `Bearer ${token}`}})
        .then(response => {
          console.log(response.data);
          setData(response.data);
        })
        .catch(error => {
          console.log(error);
        });

      setSuccess(true);
    }
    catch (error) {
      console.log(error);
      setMsg(error.response.data.error.message);
      setSuccess(false);
    setData(null);
    }
  }
  return (
    <div id="ass11">
      <label>Enter the Email:  </label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <br /><br />
      <label>Enter the password:  </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <br /><br />
      <button onClick={handleLogin}>Login</button>
      <br /><br />
      <div>
        <p style={{ color: success ? "green" : "red" }}>{msg}</p>
        {data && <div className="user-data">
        <img src={data.avatar ? data.avatar : userImg} alt="avatar" width="120" height="120"></img><br />
        <p>Name: {data.name}</p> 
        <p>Email: {data.email}</p>
        <p>Description: {data.description? data.description:"-"}</p>
        <p>Subscribed? : {data.subscribed ===true? "Yes" : "No"}</p>

        </div>}
      </div>
    </div>
  )
}
export default Authorization;