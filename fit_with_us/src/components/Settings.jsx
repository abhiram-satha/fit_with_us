import UpdateCategoryPref from "./UpdateCategoryPref";
import UpdateWeightGoal from "./UpdateWeightGoal";

export default function Settings({
  users,
  updateGoalWeight,
  selectedCategories,
                deleteCategory,
                addCategory,
                reloadRecipes}) {

  return (
    <>
      This is the settings form
      <details>
        <summary>Update Settings</summary>
        <details>
          <summary>Update Weight Settings</summary>
          <UpdateWeightGoal users={users} updateGoalWeight={updateGoalWeight} />
        </details>
      </details>
      <UpdateCategoryPref deleteCategory={deleteCategory} selectedCategories={selectedCategories} addCategory={addCategory} reloadRecipes={reloadRecipes}/>
    </>
  )
}
