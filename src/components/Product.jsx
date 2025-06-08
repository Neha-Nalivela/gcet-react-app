import React, { useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "./Product.css";

export default function Product() {
  const { user, products, setProducts, cart, setCart } = useContext(AppContext);
  const API = import.meta.env.VITE_API_URL;

  // const fetchProducts = async () => {
  //   try {
  //     const res = await axios.get(`${API}/products/all`);
  //     setProducts(res.data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  const fetchProducts = async () => {
  try {
    const token = user?.token || localStorage.getItem("token");
    const res = await axios.get(`${API}/products/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts(res.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


  const addToCart = (id) => {
    if (!cart[id]) {
      setCart({ ...cart, [id]: 1 });
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
            <div key={product._id} className="product-item">
              <strong>{product.name}</strong>: ₹{product.price}
              <br />
              <button
                onClick={() => addToCart(product._id)}
                style={{ backgroundColor: "yellow" }}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}
