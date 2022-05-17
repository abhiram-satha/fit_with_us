import RecipeIngredients from "./RecipeIngredients"
import {useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage';


export default function RecipeCard({users, recipes}) {

  const {goal_weight, current_weight} = users.users[0];

  const [recipeRecord, setRecipeRecord] = useLocalStorage('recipe', localStorage.getItem('recipe') || 0);

  const healthLabel = recipes[0][recipeRecord]['recipe']['healthLabels'];
  const info = recipes[0][recipeRecord]['recipe'];
  
  const RecipeIngredientsArray = info.ingredients.map(ingredient => {
    return <RecipeIngredients ingredient={ingredient} size={info.yield} users={users}/>
  })

  return (
    <div className="row container">
    <h1>Recommended Recipe</h1>
    {recipeRecord !== 0 && <button onClick={()=>setRecipeRecord(prev=>prev-1)}>Back</button>}
    <img src={info.images.THUMBNAIL.url} />
    {recipeRecord !== 19 && <button onClick={()=>setRecipeRecord(prev=>prev+1)}>Next</button>}
    <p>{info.label}</p>
    <p>Calories Per Serving: {goal_weight < current_weight ? Math.floor(info.calories / info.yield) : Math.floor(3 *info.calories / (info.yield))}</p>
    <ul>
    {RecipeIngredientsArray}
    </ul>
    <a href={info.url} target="_blank"><button>Instructions</button></a>
    
    </div>
  )
}