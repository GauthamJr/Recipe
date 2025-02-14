import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    console.log(`Fetching recipe details for ID: ${id}`);
    fetch(`/api/recipes/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched recipe:", data);
        setRecipe(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  if (!recipe) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <h1 className="title">{recipe.name}</h1>
      <img className="recipe-image" src={recipe.image} alt={recipe.name} />
      <h3>Cuisine: {recipe.cuisine}</h3>
      <h4>Difficulty: {recipe.difficulty}</h4>
      <h4>Rating: {recipe.rating}</h4>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetails;
