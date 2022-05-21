import React from "react";
import RecipeIngredients from "./RecipeIngredients";
import Input from "./Input";
import Button from "./Button";
import "../styles/RecipeDetails.scss";
export default function RecipeDetails({
  users,
  recipeRecord,
  recipes,
  setRecipeRecord,
  newPost,
}) {
  const recipe = recipes[0][recipeRecord]
    ? recipes[0][recipeRecord]["recipe"]
    : null;
  const ingredients = recipe.ingredients;
  const sliceRecipe = (recipeName) => {
    if (recipeName.includes("ecipes")) {
      return recipeName.slice(0, -7)
    } else if (recipeName.includes("ecipe")) {
      return recipeName.slice(0, -6)
    } else {
      return recipeName
    }
  };
  
  const { goal_weight, current_weight } = users.users[0];
  console.log(recipe)
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
    <section class="section">
      <div class="columns is-two-thirds">
        <div class="column">
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src={recipe.image} alt="Placeholder image" />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{sliceRecipe(recipe.label)}</p>
                  <p class="subtitle is-6">
                    Calories Per Serving:{" "}
                    {goal_weight < current_weight
                      ? Math.floor(recipe.calories / recipe.yield)
                      : Math.floor((3 * recipe.calories) / recipe.yield)}
                  </p>
                </div>
                <a class="media-right vertical-dots dropdown is-right is-hoverable">
                  <strong class="dropdown-trigger">&#xFE19;</strong>
                  <div
                    class="dropdown-menu is-overlay"
                    id="dropdown-menu"
                    role="menu"
                  >
                    <div class="dropdown-content">
                      <a href={recipe.url} target="_blank" class="dropdown-item">
                        <strong>Go to recipe</strong>
                      </a>
                    </div>
                  </div>
                </a>
              </div>

              <div class="content">
                <form onSubmit={newPost} class="mb-4">
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
        <div class="column">
          <div class="card">
            <table class="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>What you'll need:</th>
                </tr>
              </thead>
              <tbody>{RecipeIngredientsArray}</tbody>
            </table>
            {recipeRecord !==0 && (
            <button onClick={() => setRecipeRecord((prev) => prev - 1)}>
              Prev
            </button>
            )}

            {recipeRecord !== 19 && (
            <button
              onClick={() =>
                setRecipeRecord((prev) => Number(prev) + 1)}>
              Next
            </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
