import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  return (
    <div className="container">
      <ProductCard
        name="Wireless Headphones"
        price="129.99"
        inStock={true}
        image="https://images.unsplash.com/photo-1518444065439-e933c06ce9cd"
      />

      <ProductCard
        name="Mechanical Keyboard"
        price="89.99"
        inStock={false}
        image="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
      />

      <ProductCard
        name="Smart Watch"
        price="199.99"
        inStock={true}
        image="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b"
      />
    </div>
  );
}

export default App;
