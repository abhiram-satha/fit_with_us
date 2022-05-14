export default function RecipeIngredients({ingredient, size, users}) {
  const {goal_weight, current_weight} = users

  return (
    <li>
    {goal_weight < current_weight ? 
      ingredient.quantity === false || ingredient.measure === "<unit>" ? <p>{(ingredient.quantity / size).toFixed(2)} {ingredient.food} </p>:<p>{(ingredient.quantity / size).toFixed(2) === "0.00" ? "A bit " :(ingredient.quantity / size).toFixed(2)} {ingredient.measure} of {ingredient.food}</p>
    : ingredient.quantity === false || ingredient.measure === "<unit>" ? <p>{(3 *ingredient.quantity / size).toFixed(2)} {ingredient.food} </p>:<p>{(3 * ingredient.quantity / size).toFixed(2) === "0.00" ? "A bit " :(3 * ingredient.quantity / size).toFixed(2)} { ingredient.measure} of {ingredient.food}</p>}
    </li>
  )
}