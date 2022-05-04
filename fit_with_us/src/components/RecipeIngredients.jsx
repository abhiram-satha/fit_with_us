export default function RecipeIngredients({ingredient, size}) {
  return (
    <li>
    {ingredient.quantity === false || ingredient.measure === "<unit>" ? <p>{ingredient.quantity / size} {ingredient.food} </p>:<p>{ingredient.quantity / size} {ingredient.measure} of {ingredient.food}</p>}
    </li>
  )
}