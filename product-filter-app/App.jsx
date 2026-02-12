import { useState } from "react";
import "./App.css";

function App() {
  const products = [
    { id: 1, name: "Headphones", price: 1500, rating: 4.5 },
    { id: 2, name: "Smart Watch", price: 3000, rating: 4.2 },
    { id: 3, name: "Laptop", price: 55000, rating: 4.8 },
    { id: 4, name: "Phone", price: 20000, rating: 4.4 },
    { id: 5, name: "Keyboard", price: 800, rating: 4.0 },
  ];

  const [sortType, setSortType] = useState("");

  const handleSort = (e) => {
    setSortType(e.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "low-high") return a.price - b.price;
    if (sortType === "high-low") return b.price - a.price;
    if (sortType === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="container">
      <h2>Product Filter & Sort</h2>

      <select onChange={handleSort} className="dropdown">
        <option value="">Sort Products</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>

      <div className="grid">
        {sortedProducts.map((product) => (
          <div key={product.id} className="card">
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <p>⭐ {product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
