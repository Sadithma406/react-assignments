import { useState, useEffect } from "react";
import axios from "axios";
import userImg from '../assets/user.jpg';
import './Assignment_11.css';

const baseURL = import.meta.env.VITE_BASE_URL;


function Authorization() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("pending");
  const [checked, setChecked] = useState(false);

  const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token")
  const getHeading = () => ({ Authorization: `Bearer ${getToken()}` })
  function loadUser(method) {
    axios.get(`${baseURL}/user`, { headers: getHeading() }).then(
      response => {
        console.log(response.data);
        setData(response.data);
      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  }

  async function handleLogin() {
    try {
      const response = await axios.post(`${baseURL}/login`, {
        email, password
      })
      console.log(response.data);
      const token = response.data.access_token;
      if (checked) {
        localStorage.setItem("token", token);
      }
      else {
        sessionStorage.setItem("token", token);
      }
      loadUser(token);
      setStatus("loggedIn")
      setMsg("Successfully logged in");
      setSuccess(true);
    }
    catch (error) {
      console.log(error);
      setMsg(error.response.data.error.message);
      setSuccess(false);
      setData(null);
    }
  }

  useEffect(() => {

    setStatus(getToken() === null ? "login" : "loggedIn");
    loadUser();

  }, [])

  if (status === "pending") {
    return <p>Loading...</p>
  }
  return (
    <div id="ass11">
      <div style={{ display: status == "loggedIn" ? "none" : "block" }}>
        <label>Enter the Email:  </label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <br /><br />
        <label>Enter the password:  </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <br /><br />
        <label>Keep me logged in: </label>
        <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)}></input>
        <br /><br />
        <button onClick={handleLogin}>Login</button>
        <p style={{ color: success ? "green" : "red" }}>{msg}</p>
        <br /><br />
      </div>
      <div>
        {data && <div className="user-data">
          <img src={data.avatar ? data.avatar : userImg} alt="avatar" width="120" height="120"></img><br />
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>Description: {data.description ? data.description : "-"}</p>
          <p>Subscribed? : {data.subscribed === true ? "Yes" : "No"}</p>
        </div>}
      </div>
    </div>
  )
}
export default Authorization;