import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Product.css";
export default function Product() {
  const { user, products, setProducts, cart, setCart } = useContext(AppContext);
  // const [products, setProducts] = useState([]);
  const API = import.meta.env.VITE_API_URL;
  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products/all`);
    setProducts(res.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (id) => {
    !cart[id] && setCart({ ...cart, [id]: 1 });
    
  };

  return (
    <div className="box">
      <h3>Welcome {user?.name || "Guest"}!</h3>
      <h4 style={{ textAlign: "center" }}>Product List</h4>
      {products.length > 0 ? (
        <div className="products">
          {products.map((product) => (
            <div key={product._id || product.id} className="product-item">
              <strong>{product.name}</strong>:<br></br> ₹{product.price}<br></br>
              <button onClick={() => addToCart(value.pid)} style={{backgroundColor:"yellow"}}>Add to cart</button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No products available.</p>
      )}
    </div>
  );
}
