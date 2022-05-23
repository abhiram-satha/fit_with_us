import RecipeCard from "./RecipeCard";
import Weighthistorygraph from "./Weighthistorygraph";
import BottomNav from "./BottomNav";

export default function Homepage({
  users,
  recipeRecord,
  recipes,
  userWeight,
  updateWeight,
  weightClass,
  weightError
}) {
  return (
    <section className="section">
      <div className="columns is-two-thirds">
        <RecipeCard
          key={users.id}
          recipeRecord={recipeRecord}
          recipes={recipes}
        />
        {userWeight.length === 0 ? (
          <progress class="progress is-small is-primary" max="100">
            15%
          </progress>
        ) : (
          <Weighthistorygraph
            userWeight={userWeight}
            updateWeight={updateWeight}
            weightClass={weightClass}
            weightError={weightError}
          />
        )}
      </div>
    </section>
  );
}
