"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductPage() {

  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState(null);

  useEffect(() => {

    if (!id) return;

    async function loadProduct() {

      try {

        const response = await fetch(
          `http://127.0.0.1:8000/products/${id}`
        );

        const data = await response.json();

        setProduct(data);

      } catch (error) {

        console.log(error);
      }
    }

    loadProduct();

  }, [id]);

  if (!product) {
    return (
      <h2 style={{ padding: "40px" }}>
        Loading...
      </h2>
    );
  }

  return (

    <div style={{ padding: "40px" }}>

      <img
        src={`/images/${product.image?.split(",")[0]}`}
        alt={product.title}
        style={{
          width: "400px",
          borderRadius: "10px"
        }}
      />

      <h1>{product.title}</h1>

      <h3>₹{product.price}</h3>

      <p>{product.description}</p>

      <p>
        <b>Category:</b> {product.category}
      </p>

      <p>
        <b>Inventory:</b> {product.inventory}
      </p>

    </div>

  );
}