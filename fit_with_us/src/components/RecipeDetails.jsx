import React from "react";
import RecipeIngredients from "./RecipeIngredients";

export default function RecipeDetails({ ingredients, calories, serving, url }) {
  console.log([ingredients, calories, serving, url]);

  const RecipeIngredientsArray = ingredients.map((ingredient) => {
    return <RecipeIngredients ingredient={ingredient} size={serving} />;
  });

  return (
    <div>
      <p>Calories Per Serving: {Math.floor(calories / serving)}</p>
      <ul>{RecipeIngredientsArray}</ul>
      <a href={url} target="_blank">
        <button>Instructions</button>
      </a>
    </div>
  );
}
