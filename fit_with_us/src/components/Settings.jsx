import UpdateCategoryPref from "./UpdateCategoryPref"
import UpdateWeightGoal from "./UpdateWeightGoal"

export default function Settings({users, updateGoalWeight, categoryArray, categories, setCategories, deleteCategory}) {

  // console.log(categories)
 
  return (
    <>
    This is the settings form
    <details>
      <summary>Update Settings</summary>
        <details>
          <summary>Update Weight Settings</summary>
            <UpdateWeightGoal users={users} updateGoalWeight={updateGoalWeight}/>

        </details>
    </details>
        <UpdateCategoryPref categoryArray={categoryArray} deleteCategory={deleteCategory} categories={categories} setCategories={setCategories}/>
    </>
  )
}