import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./index.css";

function App() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Recipe Finder</h1>
      <SearchBar onSelect={(id) => navigate(`/recipe/${id}`)} />
      <div className="image-grid">
        <div className="row">
          <img src="/Img1001.jpg" alt="Recipe 1" />
          <img src="/Img1002.jpg" alt="Recipe 2" />
          <img src="/Img1003.jpg" alt="Recipe 3" />
          <img src="/Img1004.jpg" alt="Recipe 4" />
          <img src="/Img1005.jpg" alt="Recipe 5" />
          <img src="/Img1006.jpg" alt="Recipe 6" />
        </div>
      </div>
    </div>
  );
}

export default App;
