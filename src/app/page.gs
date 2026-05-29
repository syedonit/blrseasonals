"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  }, []);

  const products = [
    {
      id: 1,
      title: "Antique Watch",
      description: "Classic handcrafted antique watch décor designed with timeless vintage aesthetics.",
      image: "/images/antic-watch.png",
      price: 89.99,
      category: "Watches",
      material: "Solid Teak Wood",
      dimensions: "12cm x 8cm x 3cm",
      weight: "250g"
    },
    {
      id: 2,
      title: "Car Perfume Holder",
      description: "Elegant wooden car perfume holder crafted to enhance luxury interiors beautifully.",
      image: "/images/carperfume.png",
      price: 49.99,
      category: "Accessories",
      material: "Rosewood",
      dimensions: "8cm x 4cm x 2cm",
      weight: "80g"
    },
    {
      id: 3,
      title: "Wooden Chakra",
      description: "Traditional decorative chakra art piece made with premium wooden craftsmanship.",
      image: "/images/chakra.png",
      price: 129.99,
      category: "Decor",
      material: "Sheesham Wood",
      dimensions: "25cm x 25cm",
      weight: "450g"
    },
    {
      id: 4,
      title: "Decorative Globe",
      description: "Luxury handcrafted globe décor perfect for office spaces and elegant interiors.",
      image: "/images/globe.png",
      price: 159.99,
      category: "Decor",
      material: "Mahogany & Brass",
      dimensions: "20cm diameter",
      weight: "1.2kg"
    },
    {
      id: 5,
      title: "Wooden Ship",
      description: "Beautifully detailed wooden ship model crafted for antique and premium décor lovers.",
      image: "/images/ship.png",
      price: 199,
      category: "Models",
      material: "Teak & Rosewood",
      dimensions: "35cm x 15cm x 40cm",
      weight: "1.8kg"
    },
    {
      id: 6,
      title: "Tower Showpiece",
      description: "Stylish wooden tower showpiece designed for modern decorative collections.",
      image: "/images/tower.png",
      price: 79.99,
      category: "Showpieces",
      material: "Mango Wood",
      dimensions: "15cm x 15cm x 30cm",
      weight: "600g"
    },
    {
      id: 7,
      title: "Wall Scene Art",
      description: "Premium handcrafted wooden wall scene bringing artistic elegance to interiors.",
      image: "/images/wall-scene.png",
      price: 149.99,
      category: "Wall Art",
      material: "Premium Plywood",
      dimensions: "45cm x 35cm",
      weight: "1.5kg"
    },
  ];

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    for (let i = 0; i < quantity; i++) {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.length);
    alert(`${quantity} x ${product.title} added to cart!`);
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleImageError = (e) => {
    e.target.src = "https://placehold.co/400x400/2d1f16/white?text=No+Image";
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  return (
    <main style={{ backgroundColor: "#f8f5f0" }}>
      {/* Navbar */}
      <nav style={{ backgroundColor: "#2d1f16", padding: "16px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ color: "white", fontSize: "28px", fontWeight: "bold", letterSpacing: "1px" }}>
          BLR Seasonals
        </span>

        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>Home</a>
          <a href="#products" style={{ color: "white", textDecoration: "none" }}>Products</a>
          <a href="/cart" style={{ color: "white", textDecoration: "none", position: "relative" }}>
            🛒 Cart
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: "-10px", right: "-15px", backgroundColor: "#dc3545", color: "white", borderRadius: "50%", padding: "2px 6px", fontSize: "12px" }}>
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          height: "85vh",
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", padding: "20px" }}>
          <h1 style={{ fontSize: "70px", fontWeight: "700", marginBottom: "20px" }}>
            Handcrafted Wooden Luxury
          </h1>
          <p style={{ fontSize: "22px", marginBottom: "30px" }}>
            Premium handcrafted décor collections crafted to elevate modern and traditional interiors with timeless elegance.
          </p>
          <a href="#products">
            <button style={{ backgroundColor: "#c8a97e", color: "white", border: "none", borderRadius: "50px", padding: "15px 40px", fontSize: "16px", fontWeight: "600", cursor: "pointer" }}>
              Explore Collection
            </button>
          </a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "48px", fontWeight: "700", color: "#2d1f16" }}>
              Featured Collection
            </h2>
            <p style={{ color: "#666", fontSize: "18px" }}>
              Elegant handcrafted wooden creations curated for premium spaces.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "25px",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onClick={() => openProductModal(product)}
              >
                <div style={{ height: "280px", backgroundColor: "#f9f9f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    onError={handleImageError}
                    style={{ width: "100%", height: "100%", objectFit: "contain", padding: "20px" }}
                  />
                </div>
                <div style={{ padding: "24px", textAlign: "center" }}>
                  <span style={{ color: "#c8a97e", fontSize: "14px", fontWeight: "600" }}>
                    {product.category}
                  </span>
                  <h4 style={{ color: "#2d1f16", fontWeight: "700", marginTop: "8px", marginBottom: "12px" }}>
                    {product.title}
                  </h4>
                  <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.6", marginBottom: "16px" }}>
                    {product.description.substring(0, 80)}...
                  </p>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#2d1f16", marginBottom: "16px" }}>
                    ${product.price}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    style={{
                      width: "100%",
                      backgroundColor: "#2d1f16",
                      color: "white",
                      border: "none",
                      borderRadius: "40px",
                      padding: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#c8a97e"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#2d1f16"}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "25px",
              maxWidth: "1000px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                backgroundColor: "#2d1f16",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                fontSize: "20px",
                cursor: "pointer",
                zIndex: 1,
              }}
            >
              ×
            </button>
            
            <div style={{ padding: "40px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
                <div style={{ flex: "1", minWidth: "250px" }}>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    onError={handleImageError}
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                  />
                </div>
                <div style={{ flex: "1", minWidth: "250px" }}>
                  <span style={{ color: "#c8a97e", fontWeight: "600" }}>{selectedProduct.category}</span>
                  <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#2d1f16", marginTop: "10px" }}>
                    {selectedProduct.title}
                  </h2>
                  <div style={{ fontSize: "36px", fontWeight: "bold", color: "#2d1f16", margin: "20px 0" }}>
                    ${selectedProduct.price}
                  </div>
                  <p style={{ color: "#666", lineHeight: "1.8" }}>{selectedProduct.description}</p>
                  
                  {selectedProduct.material && (
                    <div style={{ backgroundColor: "#f8f5f0", borderRadius: "15px", padding: "20px", margin: "20px 0" }}>
                      <h4 style={{ color: "#2d1f16", marginBottom: "10px" }}>Product Details</h4>
                      <p><strong>Material:</strong> {selectedProduct.material}</p>
                      <p><strong>Dimensions:</strong> {selectedProduct.dimensions}</p>
                      <p><strong>Weight:</strong> {selectedProduct.weight}</p>
                    </div>
                  )}
                  
                  <div style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #ddd", backgroundColor: "white", cursor: "pointer" }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: "18px", fontWeight: "600", minWidth: "40px", textAlign: "center" }}>{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #ddd", backgroundColor: "white", cursor: "pointer" }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => addToCart(selectedProduct)}
                      style={{
                        flex: 1,
                        backgroundColor: "#2d1f16",
                        color: "white",
                        border: "none",
                        borderRadius: "50px",
                        padding: "15px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      Add to Cart - ${(selectedProduct.price * quantity).toFixed(2)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section style={{ backgroundColor: "white", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", textAlign: "center" }}>
          <div><div style={{ fontSize: "48px" }}>🎨</div><h5 style={{ color: "#2d1f16", fontWeight: "700" }}>Handcrafted Quality</h5><p style={{ color: "#666" }}>Each piece meticulously crafted</p></div>
          <div><div style={{ fontSize: "48px" }}>🌳</div><h5 style={{ color: "#2d1f16", fontWeight: "700" }}>Premium Wood</h5><p style={{ color: "#666" }}>Sustainably sourced</p></div>
          <div><div style={{ fontSize: "48px" }}>🚚</div><h5 style={{ color: "#2d1f16", fontWeight: "700" }}>Free Shipping</h5><p style={{ color: "#666" }}>On orders over $100</p></div>
          <div><div style={{ fontSize: "48px" }}>🛡️</div><h5 style={{ color: "#2d1f16", fontWeight: "700" }}>Lifetime Warranty</h5><p style={{ color: "#666" }}>Quality guaranteed</p></div>
        </div>
      </section>

      {/* About Section */}
      <section style={{ backgroundColor: "#2d1f16", color: "white", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "42px", fontWeight: "700", marginBottom: "20px" }}>Crafted With Passion</h2>
          <p style={{ lineHeight: "2", color: "#ddd" }}>BLR Seasonals specializes in premium handcrafted wooden décor and antique collections designed to bring timeless elegance into modern living spaces.</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#1a120d", color: "#bbb", padding: "60px 24px 40px", textAlign: "center" }}>
        <h5 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>BLR Seasonals</h5>
        <p>Nagawara Main Road, Bengaluru, Karnataka - 560045</p>
        <p>📞 +91 98765 43210 | ✉️ hello@blrseasonals.com</p>
        <hr style={{ backgroundColor: "#444", margin: "30px 0 20px", border: "none", height: "1px" }} />
        <p>© 2026 BLR Seasonals. All Rights Reserved.</p>
      </footer>
    </main>
  );
}