"use client";

import { useEffect, useState } from "react";

export default function CartPage() {

  const [cart, setCart] = useState([]);

  useEffect(() => {

    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(storedCart);

  }, []);

  // REMOVE ITEM

  const removeItem = (index) => {

    const updatedCart = [...cart];

    updatedCart.splice(index, 1);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // TOTAL PRICE

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (

    <main className="cart-page">

      <h1 className="cart-title">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (

        <p>Your cart is empty.</p>

      ) : (

        <>

          <div className="cart-container">

            {cart.map((item, index) => (

              <div className="cart-card" key={index}>

                <img
                  src={`/images/${item.image}`}
                  alt={item.title}
                  className="cart-image"
                />

                <div className="cart-content">

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <h4>₹{item.price}</h4>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          <div className="cart-total">

            <h2>Total: ₹{total}</h2>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>

          </div>

        </>

      )}

    </main>
  );
}