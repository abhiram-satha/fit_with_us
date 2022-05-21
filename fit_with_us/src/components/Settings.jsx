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
      <details>
        <summary>Goal Weight</summary>
        <UpdateWeightGoal users={users} updateGoalWeight={updateGoalWeight} />
      </details>
      <details>
        <summary>Category Preferences</summary>
        <UpdateCategoryPref
          deleteCategory={deleteCategory}
          selectedCategories={selectedCategories}
          addCategory={addCategory}
          reloadRecipes={reloadRecipes}
        />
      </details>
    </>
  );
}
