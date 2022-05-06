import RecipeCard from "./RecipeCard";
import Weighthistorygraph from "./Weighthistorygraph";


export default function Homepage({recipes, userWeight}) {
  return (
    <>
      <RecipeCard recipes={recipes} className="card"/>
      <Weighthistorygraph weights={userWeight} className="card"/>
    </>
  )
}