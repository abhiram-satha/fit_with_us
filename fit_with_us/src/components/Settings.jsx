import UpdateCategoryPref from "./UpdateCategoryPref";
import UpdateWeightGoal from "./UpdateWeightGoal";

export default function Settings({
  users,
  updateGoalWeight,
  selectedCategories,
  deleteCategory,
  addCategory,
  reloadRecipes,
}) {
  return (
    <>
      <UpdateWeightGoal users={users} updateGoalWeight={updateGoalWeight} />

      <UpdateCategoryPref
        deleteCategory={deleteCategory}
        selectedCategories={selectedCategories}
        addCategory={addCategory}
        reloadRecipes={reloadRecipes}
      />
      <button className="button is-primary full-length" onClick={reloadRecipes}>
        <a href="/homepage">Update Recipes</a>
      </button>
    </>
  );
}
