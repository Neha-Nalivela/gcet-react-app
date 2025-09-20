// src/components/Logout.jsx
import React, { useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user from context and localStorage
    setUser({});
    localStorage.removeItem("user");

    // Redirect to login
    navigate("/login");
  }, []);

  return <div>Logging out...</div>;
}
