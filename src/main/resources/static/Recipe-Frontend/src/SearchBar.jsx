import React, { useState, useEffect } from "react";

function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length >= 3) {
      console.log(`Fetching recipes for query: ${query}`);
      setLoading(true);
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
        .catch((err) => console.error("Fetch error:", err))
        .finally(() => setLoading(false));
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
      {loading && <div className="loading-text">Loading...</div>}
      {recipes.length > 0 && (
        <div className="dropdown">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="dropdown-item"
              onClick={() => {
                console.log(`Navigating to /recipe/${recipe.id}`);
                onSelect(recipe.id);
              }}
            >
              <img
                src={recipe.image || "/placeholder.png"}
                alt={recipe.name}
                className="dropdown-image"
              />
              {recipe.name} - {recipe.cuisine}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
