import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "./Product.css";

export default function Product() {
  const { user } = useContext(AppContext);//Add 
  const [products, setProducts] = useState([]);

  const API = "https://gcet-node-app-sable.vercel.app";

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products/all`);
      console.log("Fetched products:", res.data);
      setProducts(res.data);//context variable
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="box">
      <h3>Welcome {user?.name || "Guest"}!</h3>
      <h4 style={{ textAlign: "center" }}>Product List</h4>
      {products.length > 0 ? (
        <div className="products">
          {products.map((product) => (
            <div key={product._id || product.id} className="product-item">
              <strong>{product.name}</strong>:<br></br> ₹{product.price}<br></br>
              <button style={{backgroundColor:"yellow"}}>Add to cart</button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No products available.</p>
      )}
    </div>
  );
}
