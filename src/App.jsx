// src/App.jsx
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Order from "./components/Order";
import Admin from "./components/Admin";
import "./App.css";

export const AppContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  // Load user from localStorage
  const [user, setUserState] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });

  // Sync user to both state and localStorage
  const setUser = (userData) => {
    setUserState(userData);
    if (userData && userData.token) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <AppContext.Provider value={{
      users, setUsers,
      user, setUser,
      products, setProducts,
      cart, setCart,
    }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Product />} />
          <Route path="/" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order" element={<Order />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
