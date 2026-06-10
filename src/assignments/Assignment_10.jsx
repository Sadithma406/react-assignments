import { useState } from "react";
import axios from "axios";

function JWT() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleLogin() {

    try {
      const response = await axios.post('https://auth.dnjs.lk/api/login', {
        email: email, password: password
      })
      console.log(response.data);
      setMsg("Successfully logged in" + response.data.access_token);
      setSuccess(true);
    }
    catch (error) {
      console.log(error);
      setMsg("Login failed");
      setSuccess(false);
    }
  }
  return (
    <div id="ass10">
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
      </div>
    </div>
  )
}
export default JWT;