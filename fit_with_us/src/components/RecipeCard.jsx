import RecipeIngredients from "./RecipeIngredients"
import {useState} from 'react'

export default function RecipeCard({recipes}) {
  const [recipeRecord, setRecipeRecord] = useState(0)
  console.log(recipes[0])

  const info = recipes[0][recipeRecord]['recipe']
  console.log(recipes[0])
  
  const RecipeIngredientsArray = info.ingredients.map(ingredient => {
    return <RecipeIngredients ingredient={ingredient} size={info.yield}/>
  })
  console.log(info.images.THUMBNAIL.url)
  return (
    <>
    <h1>RecipeCard</h1>
    <img src={info.images.THUMBNAIL.url} />
    <button onClick={()=>setRecipeRecord(prev=>prev+1)}>Next</button>
    <p>{info.label}</p>
    <p>Calories Per Serving: {Math.floor(info.calories / info.yield)}</p>
    <ul>
    {RecipeIngredientsArray}
    </ul>
    <a href={info.url} target="_blank">Instructions</a>
    
    </>
  )
}