import { useState, useEffect } from 'react';
import axios from 'axios';
import './Assignment_13.css';
import userImg from '../assets/user.jpg';


const baseURL = import.meta.env.VITE_BASE_URL;

function main() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState("pending");

  const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");
  const getHeading = () => ({ Authorization: `Bearer ${getToken()}` })


  function loadUser() {
    axios.get(`${baseURL}/user`, { headers: getHeading() }).then(
      response => {
        setData(response.data);
        setName(response.data.name);
        setDescription(response.data.description ? response.data.description : "-");
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
      }
      else {
        sessionStorage.setItem("token", token);
      }
      loadUser();
      setMsg("Successfully logged in");
      setStatus("loggedIn");
      setSuccess(true);
    }
    catch (error) {
      console.log(error);
      setMsg(error.response.data.error.message);
      setSuccess(false);
      setData(null);
    }
  }

  function loggingOut() {
    axios.post(`${baseURL}/logout`, {}, { headers: getHeading() }).then(
      response => {
        console.log(response.data);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setStatus("login");
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
  function editDetails() {
    axios.put(`${baseURL}/user`, { name, description }, { headers: getHeading() }).then(
      response => {
        console.log(response.data);
        setData(response.data);
        setMsg("Details updated successfully");
        setSuccess(true);
        alert("Details updated successfully");
      }
    ).catch(
      error => {
        console.log(error);
        setMsg("Error updating details");
        setSuccess(false);
      }
    )
  }

  useEffect(() => {
    const token = getToken();
    if (token) {
      setStatus("loggedIn");
      loadUser();
    } else {
      setStatus("login");
    }
  }, [])

  if (status === "pending") {
    return (
      <p>Loading...</p>
    )
  }
  return (
    <div id="ass13">
      {status === "login" ? <div className="LoginScreen">
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
          {data ? <div className="user-data">
            <img src={data.avatar ? data.avatar : userImg} alt="avatar" width="120" height="120"></img><br />
            <p>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input></p>
            <p>Email: {data.email}</p>
            <p>Description: <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}></input></p>
            <p>Subscribed? : {data.subscribed === true ? "Yes" : "No"}</p>
            <br />
            <button onClick={editDetails}>Save Changes</button> &nbsp; &nbsp;
            <button onClick={loggingOut}>Log out</button>
          </div> : <p>Loading data...</p>}
        </div>}
    </div>
  )

}
export default main;