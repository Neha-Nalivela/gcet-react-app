import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Product() {
  const { user } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  const API = "https://gcet-node-app-sable.vercel.app";

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products/all`);
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
      <div class = "products">
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.length > 0 ? (
            products.map((product) => (
              <li key={product._id || product.id} style={{ margin: "10px 0" }}>
                <strong>{product.name}</strong>: ${product.price}
              </li>
            ))
          ) : (
            <li>No products available.</li>
          )}
        </ul>
            </div>
      </div>
  );
}
