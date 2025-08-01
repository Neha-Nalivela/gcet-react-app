import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useEffect } from "react";
import './Order.css'
import axios from "axios";
export default function Order() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AppContext);
  const API = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    const res = await axios.get(`${API}/orders/${user.email}`);
    setOrders(res.data);
  }

  useEffect(() => {
fetchOrders()
  }, []);
  return (
    <div className="orders">
      <div className="or">
        <h3>My Orders</h3>
      </div>
      <ol>
        {orders &&
          orders.map((value) => (
            <li key={value._id}>
              {value.email}-{value.orderValue}
            </li>
          ))}
      </ol>
    </div>
  );
}