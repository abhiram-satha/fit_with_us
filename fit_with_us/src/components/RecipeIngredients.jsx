export default function RecipeIngredients({ingredient, size}) {
  return (
    <li>
    {ingredient.quantity === false || ingredient.measure === "<unit>" ? <p>{(ingredient.quantity / size).toFixed(2)} {ingredient.food} </p>:<p>{(ingredient.quantity / size).toFixed(2) === "0.00" ? "A bit " :(ingredient.quantity / size).toFixed(2)} {ingredient.measure} of {ingredient.food}</p>}
    </li>
  )
}