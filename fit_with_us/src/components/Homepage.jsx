import RecipeCard from "./RecipeCard";
import Weighthistorygraph from "./Weighthistorygraph";


export default function Homepage({recipes, userWeight}) {
  console.log(recipes[0].length)
  return (
    <>
      {recipes[0].length === 1 ? "Loading" :<RecipeCard recipes={recipes}/>}
      <Weighthistorygraph weights={userWeight}/>
    </>
  )
}