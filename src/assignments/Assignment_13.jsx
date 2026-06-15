import { useState, useEffect } from 'react';
import axios from 'axios';
import './Assignment_13.css';
import userImg from '../assets/user.jpg';

function main() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);

  const [checked, setChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      getToken(token);
    }
  }, [])

  function getToken(method) {
    axios.get(`${baseURL}/user`, { headers: { Authorization: `Bearer ${method}` } }).then(
      response => {
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
      const response = await axios.post(`${baseURL}/login`, { email, password })
      const token = response.data.access_token;
      if (checked) {
        localStorage.setItem("token", token);
        getToken(localStorage.getItem("token"));
      }
      else {
        sessionStorage.setItem("token", token);
        getToken(sessionStorage.getItem("token"))
      }
      setMsg("Successfully logged in");
      setSuccess(true);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.error.message);
      setSuccess(false);
      setData(null);
    }

  }
  function loggingOut() {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    axios.post(`${baseURL}/logout`, {}, { headers: { Authorization: `Bearer ${token}` } }).then(
      response => {
        console.log(response.data);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
        setData(null);
        setSuccess(true);
        setMsg(response.data.message);
        setEmail("");
        setPassword("");
        setChecked(false);
      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  }
  return (
    <div id="ass13">
      {isLoggedIn === false ? <div className="LoginScreen">
        <label>Enter the Email:  </label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <br /><br />
        <label>Enter the password:  </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <br /><br />
        <label>Keep me logged in: </label>
        <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)}></input>
        <br /><br />
        <button onClick={handleLogin}>Login</button><br />
        <p style={{ color: success ? "green" : "red" }}>{msg}</p>
        <br /><br />
      </div> :

        <div className="ProfileScreen">
        <br /><br />
          <p style={{ color: success ? "green" : "red" }}>{msg}</p><br />
          {data? <div className="user-data">
            <img src={data.avatar ? data.avatar : userImg} alt="avatar" width="120" height="120"></img><br />
            <p>Name: {data.name}</p>
            <p>Email: {data.email}</p>
            <p>Description: {data.description ? data.description : "-"}</p>
            <p>Subscribed? : {data.subscribed === true ? "Yes" : "No"}</p>
            <br />
            <button onClick={loggingOut}>Log out</button>
          </div>: <p>Loading data...</p>}
        </div>}
    </div>
  )

}
export default main;