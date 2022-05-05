import RecipeIngredients from "./RecipeIngredients"
import {useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage';


export default function RecipeCard({recipes}) {
  const [recipeRecord, setRecipeRecord] = useLocalStorage('recipe', localStorage.getItem('recipe') || 0);


  const info = recipes[0][recipeRecord]['recipe']
  // console.log(recipes[0])
  
  const RecipeIngredientsArray = info.ingredients.map(ingredient => {
    return <RecipeIngredients ingredient={ingredient} size={info.yield}/>
  })
  // console.log(info.images.THUMBNAIL.url)
  return (
    <>
    <h1>Recommended Recipe</h1>
    {recipeRecord !== 0 && <button onClick={()=>setRecipeRecord(prev=>prev-1)}>Back</button>}
    <img src={info.images.THUMBNAIL.url} />
    {recipeRecord !== 19 && <button onClick={()=>setRecipeRecord(prev=>prev+1)}>Next</button>}
    <p>{info.label}</p>
    <p>Calories Per Serving: {Math.floor(info.calories / info.yield)}</p>
    <ul>
    {RecipeIngredientsArray}
    </ul>
    <a href={info.url} target="_blank">Instructions</a>
    
    </>
  )
}