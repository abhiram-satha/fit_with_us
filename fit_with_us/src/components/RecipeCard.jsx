import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

export default function RecipeCard({ recipeRecord, recipes }) {
  const recipe = recipes[0][recipeRecord]
    ? recipes[0][recipeRecord]["recipe"]
    : null;

  const url = recipe ? recipe.url : "http://localhost:3003/homepage";

  console.log(recipe);
  console.log(url);
  return (
    <div className="column">
      <div className="card">
        <div>
          <Link to="/recipe-details">
            <div className="card-image">
              <figure className="image is-square">
                <img
                  src={recipe ? recipe.image : null}
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="media-content">
                <p className="title is-6">Your meal to prep:</p>
                <p className="title is-4">{recipe ? recipe.label : null}</p>
              </div>
            </div>
          </Link>
        </div>
        <a
          href={url}
          target="_blank"
          className="button is-primary is-fullwidth"
        >
          See full recipe
          <i className="fa-solid fa-share"></i>
        </a>
      </div>
    </div>
  );
}
