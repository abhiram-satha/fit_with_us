// import { useState } from "react";
// import useLocalStorage from "../hooks/useLocalStorage";
// import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
// import RecipeDetails from "./RecipeDetails";
// import RecipeIngredients from "./RecipeIngredients";

// export default function RecipeCard({ users, recipes }) {
//   const [details, setDetails] = useState(false);
//   const [recipeRecord, setRecipeRecord] = useLocalStorage(
//     "recipe",
//     localStorage.getItem("recipe") || 0
//   );

//   const healthLabel = recipes[0][recipeRecord]["recipe"]["healthLabels"];
//   const info = recipes[0][recipeRecord]["recipe"];
//   console.log(info);
//   const showDetails = () => {
//     setDetails(true);
//   }
//   const RecipeIngredientsArray = info.ingredients.map((ingredient) => {
//     return (
//       <RecipeIngredients
//         ingredient={ingredient}
//         size={info.yield}
//         users={users}
//       />
//     );
//   });

//   // console.log(info.images.THUMBNAIL.url)
//   return ( details ? (
//     <div className="row container">
//       <h1>Recommended Recipe</h1>
//       {recipeRecord !== 0 && (
//         <button onClick={() => setRecipeRecord((prev) => prev - 1)}>
//           Back
//         </button>
//       )}
//       <img src={info.images.THUMBNAIL.url} />
//       {recipeRecord !== 19 && (
//         <button onClick={() => setRecipeRecord((prev) => prev + 1)}>
//           Next
//         </button>
//       )}
//       <p>{info.label}</p>
//       <p>Calories Per Serving: {Math.floor(info.calories / info.yield)}</p>
//       <ul>{RecipeIngredientsArray}</ul>
//       <a href={info.url} target="_blank">
//         <button>Instructions</button>
//       </a>
//     </div> )
//     : (
//         <div class="column">
//           <div class="card" onClick={showDetails}>
//             <div class="card-image">
//                 <figure class="image is-square">
//                   <img src={info.images.REGULAR.url} alt="Placeholder image"/>
//                 </figure>
//               </div>
//               <div class="card-content">
//                   <div class="media-content">
//                     <p class="title is-6">Your meal to prep:</p>
//                     <p class="title is-4">{info.label}</p>
//                   </div>
//           </div>
//         </div>
//     </div> )
//   );
// }

import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

export default function RecipeCard({ recipeRecord, recipes }) {
  const recipe = recipes[0][recipeRecord]
    ? recipes[0][recipeRecord]["recipe"]
    : null;

  const url = recipe ? recipe.url : "http://localhost:3003/homepage";

  console.log(recipe);
  console.log(url);
  return (
    <div class="column">
      <div class="card">
        <div>
          <Link to="/recipe-details">
            <div class="card-image">
              <figure class="image is-square">
                <img
                  src={recipe ? recipe.image : null}
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="card-content">
              <div class="media-content">
                <p class="title is-6">Your meal to prep:</p>
                <p class="title is-4">{recipe ? recipe.label : null}</p>
              </div>
            </div>
          </Link>
        </div>
        <a href={url} class="button is-primary is-fullwidth">
          See full recipe
          <i class="fa-solid fa-share"></i>
        </a>
      </div>
    </div>
  );
}
