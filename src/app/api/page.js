"use client";

import { useState } from "react";

// ALL YOUR PRODUCTS FROM MYSQL
const ALL_PRODUCTS = [
  {
    "id": 1,
    "title": "Wooden Ship",
    "description": "Premium handcrafted wooden ship designed for luxury interiors and antique collections.",
    "price": 699,
    "inventory": 5,
    "image": "ship.png",
    "category": "Showpieces",
    "featured": 1,
    "created_at": "2026-05-19 23:24:36",
    "mrp": 1165,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 2,
    "title": "Decorative Globe",
    "description": "Elegant handcrafted globe décor perfect for office desks and premium living spaces.",
    "price": 199,
    "inventory": 0,
    "image": "globe.png",
    "category": "Decorations",
    "featured": 1,
    "created_at": "2026-05-19 23:24:36",
    "mrp": 332,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 7,
    "title": "Car Perfume",
    "description": "Premium luxury Perfume.",
    "price": 299,
    "inventory": 5,
    "image": "carperfume.png",
    "category": "Showpieces",
    "featured": 1,
    "created_at": "2026-05-20 12:01:19",
    "mrp": 498,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 8,
    "title": "Antique landline",
    "description": "Premium luxury Perfume.",
    "price": 2999,
    "inventory": 5,
    "image": "antique-landline.png",
    "category": "Showpieces",
    "featured": 1,
    "created_at": "2026-05-20 12:02:18",
    "mrp": 4998,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 10,
    "title": "Classic Metal Wall Clock",
    "description": "Elegant watch décor piece for premium interiors.",
    "price": 600,
    "inventory": 5,
    "image": "watch.png",
    "category": "Antique Decor",
    "featured": 1,
    "created_at": "2026-05-20 15:20:48",
    "mrp": 1000,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 11,
    "title": "Jaguar Showpiece",
    "description": "Elegant decorative luxury jaguar showpiece.",
    "price": 599,
    "inventory": 5,
    "image": "jaguarshow.png",
    "category": "Show Pieces",
    "featured": 1,
    "created_at": "2026-05-22 17:19:52",
    "mrp": 998,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 12,
    "title": "Partition Shelf",
    "description": "Elegant decorative partition shelf.",
    "price": 4999,
    "inventory": 5,
    "image": "partitionshelf.png",
    "category": "Home Decor",
    "featured": 1,
    "created_at": "2026-05-22 17:19:52",
    "mrp": 8332,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 13,
    "title": "Moving Sand Art",
    "description": "Built with artistic moving sand décor.",
    "price": 499,
    "inventory": 5,
    "image": "movingsand.png",
    "category": "Show Pieces",
    "featured": 1,
    "created_at": "2026-05-22 17:19:52",
    "mrp": 832,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 14,
    "title": "Buddha Decor",
    "description": "Elegant decorative Buddha showpiece.",
    "price": 499,
    "inventory": 5,
    "image": "buddha.png",
    "category": "Show Pieces",
    "featured": 1,
    "created_at": "2026-05-22 17:19:52",
    "mrp": 832,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 15,
    "title": "Metal Wall Decor",
    "description": "Elegant decorative metal wall décor.",
    "price": 999,
    "inventory": 5,
    "image": "cyclewatch.png",
    "category": "Show Pieces",
    "featured": 1,
    "created_at": "2026-05-22 17:19:52",
    "mrp": 1665,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 16,
    "title": "Peacock Design comb",
    "description": "A beautiful comb for kids and ladies",
    "price": 999,
    "inventory": 5,
    "image": "comb.png",
    "category": "Show Pieces",
    "featured": 1,
    "created_at": "2026-05-22 17:19:52",
    "mrp": 1665,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 17,
    "title": "Gramophone Decor",
    "description": "Elegant decorative gramophone showpiece.",
    "price": 499,
    "inventory": 5,
    "image": "gramophone.png",
    "category": "Show Pieces",
    "featured": 1,
    "created_at": "2026-05-22 17:19:52",
    "mrp": 832,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 18,
    "title": "Wooden Key Holder",
    "description": "Premium handcrafted wooden key holder designed for luxury interiors and elegant homes.",
    "price": 499,
    "inventory": 5,
    "image": "keyholder1.png,keyholder2.png,keyholder3.png",
    "category": "Key Holder",
    "featured": 1,
    "created_at": "2026-05-24 15:30:35",
    "mrp": 999,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 20,
    "title": "Wooden Side Table, Handcrafted",
    "description": "Easy Assembly: This table requires simple assembly.",
    "price": 499,
    "inventory": 5,
    "image": "woodensidetable1.png,woodensidetable2.png,woodensidetable3.png",
    "category": "Furniture",
    "featured": 1,
    "created_at": "2026-05-25 15:38:52",
    "mrp": 999,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 21,
    "title": "Wooden Mug (Pack of 2)",
    "description": "Multi-Purpose: Perfect for daily use at home, office and gifting.",
    "price": 699,
    "inventory": 5,
    "image": "woodenmug1.png,woodenmug2.png,woodenmug3.png",
    "category": "Kitchen Decor",
    "featured": 1,
    "created_at": "2026-05-25 15:38:52",
    "mrp": 1299,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 22,
    "title": "Dummy Clock Tower",
    "description": "Decorative accent: It can be placed in the living room or office.",
    "price": 699,
    "inventory": 5,
    "image": "clocktower1.png,clocktower2.png",
    "category": "Showpieces",
    "featured": 1,
    "created_at": "2026-05-25 15:38:52",
    "mrp": 999,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 23,
    "title": "Iron Bike Miniature Showpiece",
    "description": "Versatile Decor: Ideal for offices, living areas and shelves.",
    "price": 399,
    "inventory": 5,
    "image": "ironbike1.png,ironbike2.png,ironbike3.png",
    "category": "Showpieces",
    "featured": 1,
    "created_at": "2026-05-25 15:38:52",
    "mrp": 899,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 24,
    "title": "Wooden Stool: Antique-Looking Natural Wood",
    "description": "Storage features include a handy bottom shelf for extra space.",
    "price": 1999,
    "inventory": 5,
    "image": "woodenstool1.png,woodenstool2.png,woodenstool3.png",
    "category": "Furniture",
    "featured": 1,
    "created_at": "2026-05-25 15:38:52",
    "mrp": 3999,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 25,
    "title": "Round Wall Clock with Sun Style Hanging",
    "description": "It looks elegant because of its large numbers and circular design.",
    "price": 1299,
    "inventory": 5,
    "image": "roundwallclock1.png,roundwallclock2.png",
    "category": "Wall Decor",
    "featured": 1,
    "created_at": "2026-05-25 15:38:52",
    "mrp": 2499,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 26,
    "title": "Elephant Design Ash Tray",
    "description": "A distinctive sculptural ashtray featuring an elephant motif.",
    "price": 999,
    "inventory": 5,
    "image": "elephanthashtray1.png,elephanthashtray2.png,elephanthashtray3.png",
    "category": "Showpieces",
    "featured": 1,
    "created_at": "2026-05-27 15:48:47",
    "mrp": 1999,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 27,
    "title": "Butterfly Desgin Comb",
    "description": "A beautiful comb for kids and ladies.",
    "price": 999,
    "inventory": 5,
    "image": "butterflycomb1.png,butterflycomb2.png,butterflycomb3.png",
    "category": "Showpieces",
    "featured": 0,
    "created_at": "2026-05-27 20:10:12",
    "mrp": 1999,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 28,
    "title": "Butterfly Design Light",
    "description": "A decorative butterfly-shaped light for ambient lighting.",
    "price": 999,
    "inventory": 5,
    "image": "butterfly1.png,butterfly2.png,butterfly3.png",
    "category": "Showpiece",
    "featured": 1,
    "created_at": "2026-05-27 20:21:45",
    "mrp": 1999,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  },
  {
    "id": 29,
    "title": "Boxy Wooden Wall Shelf",
    "description": "Boxy Wooden Wall Shelf, Home Decor Items Wall Mounted Book Shelf.",
    "price": 1999,
    "inventory": 5,
    "image": "Boxy_ wooden_wall_shelf.png,Boxy_ wooden_wall_shelf1.png,Boxy_ wooden_wall_shelf2.png",
    "category": "Showpiece",
    "featured": 1,
    "created_at": "2026-05-27 20:36:09",
    "mrp": 2999,
    "views": 0,
    "add_to_cart": 0,
    "purchases": 0
  }
];

export default function Home() {
  const [products] = useState(ALL_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(ALL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);

  
  // FILTER PRODUCTS
  const handleFilter = (searchTerm, category) => {
    let updated = [...products];
    
    if (searchTerm) {
      updated = updated.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (category !== "All") {
      updated = updated.filter(p => p.category === category);
    }
    
    setFilteredProducts(updated);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    handleFilter(value, selectedCategory);
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
    handleFilter(search, category);
  };

  // ADD TO CART
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.length);
    alert(`${product.title} added to cart!`);
  };

  // Get unique categories
  const categories = ["All", ...new Set(products.map(p => p.category))];

  return (
    <main style={{ background: "#f8f5f0", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <nav style={{
        background: "#4e342e",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        flexWrap: "wrap",
        gap: "10px"
      }}>
        <h2 style={{ margin: 0 }}>BLR Seasonals</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          style={{
            width: "40%",
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
            minWidth: "200px"
          }}
        />
        <a href="/cart" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          🛒 Cart ({cartCount})
        </a>
      </nav>

      {/* MAIN */}
      <div style={{ display: "flex", padding: "20px", gap: "20px", flexWrap: "wrap" }}>
        {/* SIDEBAR */}
        <div style={{
          width: "250px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          height: "fit-content",
          border: "1px solid #d7ccc8"
        }}>
          <h3>Filters</h3>
          <hr />
          <h4>Categories</h4>
          {categories.map(cat => (
            <div key={cat} style={{ marginTop: "10px" }}>
              <button
                onClick={() => handleCategory(cat)}
                style={{
                  border: "none",
                  background: selectedCategory === cat ? "#6d4c41" : "transparent",
                  color: selectedCategory === cat ? "white" : "#333",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                  fontWeight: selectedCategory === cat ? "bold" : "normal"
                }}
              >
                {cat}
              </button>
            </div>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px"
          }}>
            {filteredProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              filteredProducts.map((product) => {
                const firstImage = product.image?.split(",")[0]?.trim() || "placeholder.png";
                return (
                  <div key={product.id} style={{
                    background: "white",
                    padding: "15px",
                    borderRadius: "10px",
                    border: "1px solid #d7ccc8",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    display: "flex",
                    flexDirection: "column"
                  }}>
                    <img
                      src={`/images/${firstImage}`}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        background: "#f0ede8"
                      }}
                      onError={(e) => {
                        e.target.src = "/images/placeholder.png";
                      }}
                    />
                    <h3 style={{ marginTop: "15px", fontSize: "18px", color: "#3e2723", minHeight: "50px" }}>
                      {product.title}
                    </h3>
                    <p style={{ color: "#666", fontSize: "14px" }}>{product.category}</p>
                    <div style={{ marginTop: "10px" }}>
                      <span style={{ fontSize: "22px", fontWeight: "bold" }}>₹{product.price}</span>
                      <span style={{ textDecoration: "line-through", marginLeft: "10px", color: "#888" }}>
                        ₹{product.mrp}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        marginTop: "15px",
                        width: "100%",
                        padding: "12px",
                        border: "none",
                        background: "#6d4c41",
                        color: "white",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "0.3s"
                      }}
                      onMouseEnter={(e) => e.target.style.background = "#4e342e"}
                      onMouseLeave={(e) => e.target.style.background = "#6d4c41"}
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
