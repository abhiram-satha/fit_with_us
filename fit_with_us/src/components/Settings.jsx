import UpdateCategoryPref from "./UpdateCategoryPref";
import UpdateWeightGoal from "./UpdateWeightGoal";
import { Link } from "react-router-dom";

export default function Settings({
  users,
  updateGoalWeight,
  selectedCategories,
  deleteCategory,
  addCategory,
  reloadRecipes,
}) {
  return (
    <section className="section">
      <UpdateWeightGoal users={users} updateGoalWeight={updateGoalWeight} />

      <UpdateCategoryPref
        deleteCategory={deleteCategory}
        selectedCategories={selectedCategories}
        addCategory={addCategory}
      />
      <Link to="/homepage">
        <button
          className="button is-primary full-length"
          onClick={reloadRecipes}
        >
          Update Recipes
        </button>
      </Link>
    </section>
  );
}
