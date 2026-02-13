import { useState } from "react";
import "./App.css";
import bookImage from "./assets/book.jpg";

function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Sample Book",
      author: "Author Name",
      image: bookImage,
    },
  ]);

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Add Book
  const addBook = () => {
    if (title.trim() === "" || author.trim() === "") return;

    const newBook = {
      id: Date.now(),
      title,
      author,
      image: bookImage, // default image
    };

    setBooks([...books, newBook]);
    setTitle("");
    setAuthor("");
  };

  // Remove Book
  const removeBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // Filter Books
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Library Management System</h1>

      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      <div className="form">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      <div className="book-list">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src={book.image}
              alt={book.title}
              className="book-img"
            />
            <div>
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
            </div>
            <button
              className="remove-btn"
              onClick={() => removeBook(book.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
