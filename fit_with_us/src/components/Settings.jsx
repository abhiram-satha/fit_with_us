import UpdateCategoryPref from "./UpdateCategoryPref";
import UpdateWeightGoal from "./UpdateWeightGoal";

export default function Settings({
  users,
  updateGoalWeight,
  categoryArray,
  categories,
  setCategories,
}) {
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
      {/* <UpdateCategoryPref categoryArray={categoryArray} categories={categories} setCategories={setCategories}/> */}
    </>
  );
}
