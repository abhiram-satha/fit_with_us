import React from "react";
import RecipeIngredients from "./RecipeIngredients";

export default function RecipeDetails({ users, recipe, ingredients}) {

  const RecipeIngredientsArray = ingredients.map((ingredient) => {
    return (
      <RecipeIngredients
        ingredient={ingredient}
        size={recipe.yield}
        users={users}
      />
    );
  });


  return (
    <div>
      <p>Calories Per Serving: {Math.floor(recipe.calories / recipe.yield)}</p>
      <ul>{RecipeIngredientsArray}</ul>
      <a href={recipe.url} target="_blank">
        <button>Instructions</button>
      </a>
    </div>
  );
}
