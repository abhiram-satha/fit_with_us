import RecipeCard from "./RecipeCard";
import Weighthistorygraph from "./Weighthistorygraph";


export default function Homepage({userWeight}) {
  return (
    <>
      <RecipeCard />
      <Weighthistorygraph weights={userWeight}/>
    </>
  )
}