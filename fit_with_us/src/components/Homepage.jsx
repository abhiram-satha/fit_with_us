import RecipeCard from "./RecipeCard";
import Weighthistorygraph from "./Weighthistorygraph";

export default function Homepage({ recipes, userWeight }) {
  return (
    <>
      {recipes[0].length === 1 ? (
        "Loading"
      ) : (
        <RecipeCard recipes={recipes} className="card" />
      )}
      {userWeight.length === 0 ? (
        "Loading"
      ) : (
        <Weighthistorygraph weights={userWeight} className="card" />
      )}
    </>
  );
}