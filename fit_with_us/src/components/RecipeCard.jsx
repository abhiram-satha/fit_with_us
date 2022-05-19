import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import RecipeDetails from "./RecipeDetails";
import RecipeIngredients from "./RecipeIngredients";

export default function RecipeCard({ users, recipes }) {
  const [recipeRecord, setRecipeRecord] = useLocalStorage(
    "recipe",
    localStorage.getItem("recipe") || 0
  );

  const healthLabel = recipes[0][recipeRecord]["recipe"]["healthLabels"];
  const info = recipes[0][recipeRecord]["recipe"];
  console.log(info);

  const RecipeIngredientsArray = info.ingredients.map((ingredient) => {
    return (
      <RecipeIngredients
        ingredient={ingredient}
        size={info.yield}
        users={users}
      />
    );
  });

  // console.log(info.images.THUMBNAIL.url)
  return (
    <div className="row container">
      <h1>Recommended Recipe</h1>
      {recipeRecord !== 0 && (
        <button onClick={() => setRecipeRecord((prev) => prev - 1)}>
          Back
        </button>
      )}
      <img src={info.images.THUMBNAIL.url} />
      {recipeRecord !== 19 && (
        <button
          onClick={() => setRecipeRecord((prev) => Number.parseInt(prev) + 1)}
        >
          Next
        </button>
      )}
      <p>{info.label}</p>
      <p>Calories Per Serving: {Math.floor(info.calories / info.yield)}</p>
      <ul>{RecipeIngredientsArray}</ul>
      <a href={info.url} target="_blank">
        <button>Instructions</button>
      </a>
    </div>
    //     <div class="column">
    //       <div class="card">
    //         <Link to="/recipe-details">
    //         <div class="card-image">
    //             <figure class="image is-square">
    //               <img src={info.images.REGULAR.url} alt="Placeholder image"/>
    //             </figure>
    //           </div>
    //           <div class="card-content">
    //               <div class="media-content">
    //                 <p class="title is-6">Your meal to prep:</p>
    //                 <p class="title is-4">{info.label}</p>
    //               </div>
    //       </div>
    //       </Link>
    //     </div>
    // </div>
  );
}
