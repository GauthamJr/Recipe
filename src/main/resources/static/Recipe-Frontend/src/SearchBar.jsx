import React, { useState, useEffect } from "react";

function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (query.length >= 3) {
      console.log(`Fetching recipes for query: ${query}`);
      fetch(`/api/recipes/search?query=${query}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Fetched recipes:", data.content);
          setRecipes(data.content || []);
        })
        .catch((err) => console.error("Fetch error:", err));
    } else {
      setRecipes([]);
    }
  }, [query]);

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search for recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {recipes.length > 0 && (
        <div className="dropdown">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="dropdown-item"
              onClick={() => onSelect(recipe.id)}
            >
              {recipe.name} - {recipe.cuisine}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
