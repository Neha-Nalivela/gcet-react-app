import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const { cart, setCart, products, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const total = products.reduce((sum, product) => {
      const quantity = cart[product._id] ?? 0;
      return sum + product.price * quantity;
    }, 0);
    setOrderValue(total);
  }, [cart, products]);

  const increment = (id) => {
    setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 });
  };

  const decrement = (id) => {
    const newQty = (cart[id] ?? 1) - 1;
    const updatedCart = { ...cart };
    if (newQty > 0) {
      updatedCart[id] = newQty;
    } else {
      delete updatedCart[id];
    }
    setCart(updatedCart);
  };

  const placeOrder = async () => {
    const url = `${API}/orders/new`;
    await axios.post(url, { email: user.email, orderValue });
    setCart({});
    navigate("/order");
  };

  return (
    <div>
      <h3>My Cart</h3>
      {products
        .filter((product) => cart[product._id])
        .map((product) => (
          <div key={product._id}>
            {product.name} - ₹{product.price} x {cart[product._id]}
            <button onClick={() => decrement(product._id)}>-</button>
            <button onClick={() => increment(product._id)}>+</button>
            = ₹{product.price * cart[product._id]}
          </div>
        ))}
      <hr />
      <h3>Order Value: ₹{orderValue}</h3>
      {user.name ? (
        <button onClick={placeOrder}>Place Order</button>
      ) : (
        <button onClick={() => navigate("/login")}>Login to Order</button>
      )}
    </div>
  );
}
