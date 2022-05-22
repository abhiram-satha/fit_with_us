import React from "react";
import RecipeIngredients from "./RecipeIngredients";
import Input from "./Input";
import Button from "./Button";
import "../styles/RecipeDetails.scss";
import { Link } from "react-router-dom";

export default function RecipeDetails({
  users,
  recipeRecord,
  recipes,
  setRecipeRecord,
  newPost,
}) {
  if (!recipes[0][0]) {
  } else {
    const recipe = recipes[0][recipeRecord]
      ? recipes[0][recipeRecord]["recipe"]
      : null;
    const ingredients = recipe.ingredients;
    const sliceRecipe = (recipeName) => {
      if (recipeName.includes("ecipes")) {
        return recipeName.slice(0, -7);
      } else if (recipeName.includes("ecipe")) {
        return recipeName.slice(0, -6);
      } else {
        return recipeName;
      }
    };

    const { goal_weight, current_weight } = users.users[0];

    const RecipeIngredientsArray = ingredients.map((ingredient) => {
      return (
        <RecipeIngredients
          ingredient={ingredient}
          size={recipe.yield}
          users={users}
        />
      );
    });

    return recipes[0][0] ? (
      <section className="section">
        <div id="back" className="mb-4">
          <Link to="/homepage">
            <i id="back-icon" className="fa-solid fa-angle-left"></i>
          </Link>
        </div>
        <div className="columns is-two-thirds">
          <div className="column">
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img src={recipe.image} alt="Placeholder image" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-4">{sliceRecipe(recipe.label)}</p>
                    <p className="subtitle is-6">
                      Calories Per Serving:{" "}
                      {goal_weight < current_weight
                        ? Math.floor(recipe.calories / recipe.yield)
                        : Math.floor((3 * recipe.calories) / recipe.yield)}
                    </p>
                  </div>
                  <a className="media-right vertical-dots dropdown is-right is-hoverable">
                    <strong className="dropdown-trigger">&#xFE19;</strong>
                    <div
                      className="dropdown-menu is-overlay"
                      id="dropdown-menu"
                      role="menu"
                    >
                      <div className="dropdown-content">
                        <a
                          href={recipe.url}
                          target="_blank"
                          className="dropdown-item"
                        >
                          <strong>Go to recipe</strong>
                        </a>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="content">
                  <form onSubmit={newPost} className="mb-4">
                    <Input
                      inputType="textarea"
                      type="text"
                      label="Share your thoughts on this recipe!"
                      placeholder="Create a New Post"
                      buttonName="Submit"
                    />
                    <Button name="Submit" />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>What you'll need:</th>
                  </tr>
                </thead>
                <tbody className="recipe-ingredients-overflow">
                  {RecipeIngredientsArray}
                </tbody>
              </table>
            </div>
          </div>
          <div className="recipe-button column">
            {recipeRecord !== 0 && (
              <button
                className="button is-primary recipe-switch"
                onClick={() => setRecipeRecord((prev) => prev - 1)}
              >
                Previous recipe
              </button>
            )}

            {recipeRecord !== 19 && (
              <button
                className="button is-primary is-pulled-right recipe-switch"
                onClick={() =>
                  setRecipeRecord((prev) => Number.parseInt(prev) + 1)
                }
              >
                Next recipe
              </button>
            )}
          </div>
        </div>
      </section>
    ) : (
      <progress className="progress is-small is-primary" max="100">
        15%
      </progress>
    );
  }
}
