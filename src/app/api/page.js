"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // LOAD PRODUCTS
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    loadProducts();
  }, []);

  // FILTER PRODUCTS
  useEffect(() => {
    let updatedProducts = [...products];

    // SEARCH
    if (search !== "") {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // CATEGORY
    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(updatedProducts);
  }, [search, selectedCategory, products]);

  // ADD TO CART
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} added to cart`);
  };

  return (
    <main style={{ background: "#f8f5f0", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <nav
        style={{
          background: "#4e342e",
          borderBottom: "1px solid #d7ccc8",
          padding: "15px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 1000
        }}
      >
        <h2 style={{ margin: 0 }}>BLR Seasonals</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "40%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #d7ccc8",
            outline: "none"
          }}
        />
        <a href="/cart" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          Cart
        </a>
      </nav>

      {/* MAIN SECTION */}
      <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
        {/* FILTER SIDEBAR */}
        <div
          style={{
            width: "250px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            height: "fit-content",
            border: "1px solid #d7ccc8"
          }}
        >
          <h3>Filters</h3>
          <hr />
          <h4 style={{ marginTop: "20px" }}>Categories</h4>
          {[
            "All",
            "Showpieces",
            "Furniture",
            "Wall Decor",
            "Kitchen Decor",
            "Key Holder"
          ].map((category) => (
            <div key={category} style={{ marginTop: "10px" }}>
              <button
                onClick={() => setSelectedCategory(category)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "16px",
                  color: "#333"
                }}
              >
                {category}
              </button>
            </div>
          ))}
        </div>

        {/* PRODUCTS */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px"
            }}
          >
            {filteredProducts.map((product) => (
              <a
                key={product.id}
                href={`/product/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    background: "white",
                    padding: "15px",
                    borderRadius: "10px",
                    transition: "0.3s",
                    height: "100%",
                    border: "1px solid #d7ccc8",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
                  }}
                >
                  <img
                    src={`/images/${product.image?.split(",")[0]}`}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "10px"
                    }}
                  />
                  <h3 style={{ marginTop: "15px", fontSize: "18px", color: "#3e2723" }}>
                    {product.title}
                  </h3>
                  <p style={{ color: "#666", fontSize: "14px", marginTop: "10px" }}>
                    {product.category}
                  </p>
                  <div style={{ marginTop: "15px" }}>
                    <span style={{ fontSize: "22px", fontWeight: "bold", color: "#111" }}>
                      ₹{product.price}
                    </span>
                    <span
                      style={{
                        textDecoration: "line-through",
                        marginLeft: "10px",
                        color: "#888"
                      }}
                    >
                      ₹{product.mrp}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    style={{
                      marginTop: "15px",
                      width: "100%",
                      padding: "12px",
                      border: "none",
                      background: "#6d4c41",
                      color: "white",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold"
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
