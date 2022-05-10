import React from "react";
import RecipeIngredients from "./RecipeIngredients"


export default function RecipeDetails(props) {

  const RecipeIngredientsArray = props.info.ingredients.map(ingredient => {
    return <RecipeIngredients ingredient={ingredient} size={props.info.yield}/>
  })

return (
  <div>
  <p>Calories Per Serving: {Math.floor(props.info.calories / props.info.yield)}</p>
  <ul>
  {RecipeIngredientsArray}
  </ul>
  <a href={props.info.url} target="_blank"><button>Instructions</button></a>
  
  </div> )
}