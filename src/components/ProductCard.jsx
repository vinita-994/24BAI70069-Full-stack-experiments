import React from "react";
import "../App.css";

function ProductCard({ name, price, inStock, image }) {
  return (
    <div className="card">
      <img src={image} alt={name} className="product-img" />

      <h2>{name}</h2>
      <h3>${price}</h3>

      <span className={inStock ? "stock in" : "stock out"}>
        {inStock ? "In Stock" : "Out of Stock"}
      </span>

      <button className="btn">Buy Now</button>
    </div>
  );
}

export default ProductCard;
