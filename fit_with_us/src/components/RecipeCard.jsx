import RecipeIngredients from "./RecipeIngredients"

export default function RecipeCard({recipes}) {
  console.log(recipes[0]['hits'][0]['recipe'])

  const info = recipes[0]['hits'][0]['recipe']

  const RecipeIngredientsArray = info.ingredients.map(ingredient => {
    return <RecipeIngredients ingredient={ingredient} size={info.yield}/>
  })
  return (
    <>
    <h1>RecipeCard</h1>
    <img src={info.images.THUMBNAIL.url} />
    <p>{info.label}</p>
    <p>Calories Per Serving: {Math.floor(info.calories / info.yield)}</p>
    <ul>
    {RecipeIngredientsArray}
    </ul>
    
    </>
  )
}