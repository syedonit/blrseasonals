"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // LOAD PRODUCTS

  useEffect(() => {

    async function loadProducts() {

      const response = await fetch(
        "https://blrseasonals.onrender.com/products"
      );

      const data = await response.json();

      setProducts(data);
      setFilteredProducts(data);
    }

    loadProducts();

  }, []);

  // FILTER PRODUCTS

  useEffect(() => {

    let updatedProducts = [...products];

    // SEARCH

    if (search !== "") {

      updatedProducts = updatedProducts.filter(
        (product) =>
          product.title
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    // CATEGORY

    if (selectedCategory !== "All") {

      updatedProducts = updatedProducts.filter(
        (product) =>
          product.category === selectedCategory
      );
    }

    setFilteredProducts(updatedProducts);

  }, [search, selectedCategory, products]);

  // ADD TO CART

  const addToCart = (product) => {

    let cart = JSON.parse(
      localStorage.getItem("cart")
    ) || [];

    cart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert(`${product.title} added to cart`);
  };

  return (

    <main>

      {/* NAVBAR */}

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          background: "#111",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 1000
        }}
      >

        <h2>BLR Seasonals</h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center"
          }}
        >

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              width: "250px"
            }}
          />

          {/* CART */}

          <a
            href="/cart"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Cart
          </a>

        </div>

      </nav>

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-content">

          <h1>BLR Seasonals</h1>

          <p>
            Premium handcrafted wooden décor and
            luxury antique collections designed
            for elegant interiors.
          </p>

          <button className="hero-btn">
            Explore Collection
          </button>

        </div>

      </section>

      {/* FILTERS */}

      <section
        style={{
          padding: "30px",
          textAlign: "center"
        }}
      >

        <button
          onClick={() =>
            setSelectedCategory("All")
          }
          className="filter-btn"
        >
          All
        </button>

        <button
          onClick={() =>
            setSelectedCategory("Showpieces")
          }
          className="filter-btn"
        >
          Showpieces
        </button>

        <button
          onClick={() =>
            setSelectedCategory("Antiques")
          }
          className="filter-btn"
        >
          Antiques
        </button>

        <button
          onClick={() =>
            setSelectedCategory("Wall Decor")
          }
          className="filter-btn"
        >
          Wall Decor
        </button>

      </section>

      {/* PRODUCTS */}

      <section className="products-section">

        <h2 className="section-title">
          Featured Collection
        </h2>

        <div className="container">

          <div className="row g-4">

            {filteredProducts.map((product) => (

              <div
                className="col-md-4"
                key={product.id}
              >

                <a
                  href={`/product/${product.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >

                  <div className="product-card">

                    {/* IMAGE */}

                    <div className="product-image-box">

                      <img
                        src={`/images/${product.image.split(",")[0]}`}
                        alt={product.title}
                      />

                    </div>

                    {/* CONTENT */}

                    <div className="product-content">

                      <p className="product-category">
                        {product.category}
                      </p>

                      <h3 className="product-title">
                        {product.title}
                      </h3>

                      <p className="product-description">
                        {product.description}
                      </p>

                      {/* PRICE */}

                      <div
                        style={{
                          marginTop: "15px"
                        }}
                      >

                        <span
                          style={{
                            fontSize: "24px",
                            fontWeight: "bold"
                          }}
                        >
                          ₹{product.price}
                        </span>

                        <span
                          style={{
                            textDecoration:
                              "line-through",
                            marginLeft: "10px",
                            color: "#888"
                          }}
                        >
                          ₹{product.mrp}
                        </span>

                      </div>

                      {/* INVENTORY */}

                      <p
                        style={{
                          marginTop: "10px"
                        }}
                      >
                        In Stock:
                        {" "}
                        {product.inventory}
                      </p>

                      {/* BUTTON */}

                      <button
                        className="cart-btn"
                        onClick={(e) => {

                          e.preventDefault();

                          addToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>

                    </div>

                  </div>

                </a>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}