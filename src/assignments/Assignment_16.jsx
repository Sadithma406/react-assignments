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
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");


    const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");

    const api = axios.create({ baseURL: baseURL })
    api.interceptors.request.use(config => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
        , error => { return Promise.reject(error); })

    api.interceptors.response.use(response => response,
        error => {
            console.log(error);
            if (error.response && error.response.data && error.response.data.error) {
                setMsg(error.response.data.error.message);
            } else {
                setMsg("Something went wrong");
            }
            setSuccess(false);
            return Promise.reject(error);
        })

    function loadUser() {
        api.get(`/user`).then(
            response => {
                setData(response.data);
                setName(response.data.name);
                setDescription(response.data.description ? response.data.description : "-");
            }
        ).catch(() => { })
    }

    async function handleLogin() {
        try {
            const response = await api.post('/login', { email, password })
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
            setData(null);
        }

    }
    function loggingOut() {
        api.post('/logout', {}).then(
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
        ).catch(() => { })
    }
    function editDetails() {
        api.put('/user', { name, description }).then(
            response => {
                console.log(response.data);
                setData(response.data);
                setMsg("Details updated successfully");
                setSuccess(true);
                alert("Details updated successfully");
            }
        ).catch(() => { })
    }


    function uploadImage() {
        if (selectedImage) {
            const formData = new FormData();
            formData.append("avatar", selectedImage);
            api.post('/avatar', formData).then(
                response => {
                    console.log(response.data);
                    data.avatar = response.data.avatar;
                    setMsg("Profile picture updated successfully");
                    setSuccess(true);
                }
            ).catch(() => { })
        }

    }

    function changePassword() {
        if (!newPassword || !currentPassword || !confirmNewPassword) {
            setMsg("Please fill in all the fields");
            setSuccess(false);
        }
        else if (newPassword !== confirmNewPassword) {
            setMsg("Passwords do not match");
            setSuccess(false);
        }
        else if (newPassword.length < 8 || newPassword > 40) {
            setMsg("Password should be more than 8 and less than 40 characters");
            setSuccess(false);
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*/\-@#$]).+$/.test(newPassword)) {
            setMsg(`Password must contain at least one uppercase letter,\n one lowercase letter, \n one number, \n and one special character`)
            setSuccess(false);
        }
        else {
            api.put('/password', { old_password: currentPassword, new_password: newPassword }).then(
                response => {
                    console.log(response.data);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmNewPassword("");
                    setStatus("login");
                    alert(response.data.message);
                    setSuccess(true);
                    setMsg("")
                }
            ).catch(() => { })
        }
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
            {status === "login" && <div className="LoginScreen">
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
                <br /><br />
                <p className={success ? "pass" : "fail"}>{msg}</p>
                <br /><br />
            </div>}

            {status === "loggedIn" && <div className="ProfileScreen">
                <br /><br />
                <p className={success ? "pass" : "fail"}>{msg}</p><br />
                {data ? <div className="user-data">
                    <img src={data.avatar ? data.avatar : userImg} alt="avatar" width="120" height="120"></img><br />
                    <p>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input></p>
                    <p>Email: {data.email}</p>
                    <p>Description: <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}></input></p>
                    <p>Subscribed? : {data.subscribed === true ? "Yes" : "No"}</p>
                    <label>Update profile picture: </label>
                    <input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])}></input>
                    <button onClick={uploadImage}>Upload</button>
                    <br /><br /><br />
                    <button onClick={editDetails}>Save Changes</button>&nbsp; &nbsp;
                    <button onClick={loggingOut}>Log out</button><br /><br />
                    <div style={{ color: "blue", cursor: "pointer" }} onClick={() => { setStatus("pwdChange"); setMsg("") }}>Change Password?</div>
                </div> : <p>Loading data...</p>}
            </div>}
            {status === "pwdChange" && <div>
                <br />
                <p className={success ? "pass" : "fail"}>{msg}</p>
                <br />
                <label>Current Password: </label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}></input>
                <br /><br />
                <label>New Password: </label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                <br /><br />
                <label>Confirm New Password: </label>
                <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}></input>
                <br /><br />
                <button onClick={changePassword}>Change Password</button>&nbsp; &nbsp;
                <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setStatus("loggedIn")}>Back to Preview</span>
            </div>}
        </div>
    )

}
export default main;