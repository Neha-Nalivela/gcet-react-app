import React from "react";
import App, { AppContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <div className="home">
      <h1>My Online Shop</h1>
      <Link to="/">Home</Link>-<Link to="/order">Orders</Link>-<Link to="/cart">Cart</Link>-
      {user.token ? (
        <>
          {user.role==="admin" && <Link to="/admin">Admin</Link>}
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}

      <hr />
    </div>
  );
}