import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Product() {
  const { user } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      console.log("Fetched products:", res.data);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h3>Welcome {user?.name || "Guest"}!</h3>
      <h4>Product List</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div class="box">
              <li key={product.id} style={{ margin: "10px 0" }}>
                <strong>{product.name}</strong>: ${product.price}
              </li>
            </div>
          ))
        ) : (
          <li>No products available.</li>
        )}
      </ul>
    </div>
  );
}
