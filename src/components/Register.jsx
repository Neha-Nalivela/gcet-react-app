import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Register() {
  const { setUser } = useContext(AppContext);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API}/users/register`, newUser);
      setMsg("Registered successfully!");
      setUser(res.data); // optional: store returned user data
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      setMsg("Error: Could not register. Try again.");
    }
  };

  return (
    <div style={{ margin: "30px" }}>
      <h3>Register</h3>
      {msg && <p>{msg}</p>}
      <p>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
      </p>
      <p>
        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
