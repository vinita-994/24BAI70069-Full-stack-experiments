import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const maxChars = 100;

  const remaining = maxChars - text.length;

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="container">
      <h2>Live Character Counter</h2>

      <textarea
        placeholder="Start typing here..."
        value={text}
        onChange={handleChange}
        className={
          text.length > maxChars
            ? "textarea error"
            : text.length > maxChars - 20
            ? "textarea warning"
            : "textarea"
        }
      ></textarea>

      <div className="counter">
        <span className={remaining < 0 ? "red" : ""}>
          {text.length} / {maxChars} characters
        </span>
      </div>
    </div>
  );
}

export default App;
