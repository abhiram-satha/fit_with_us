import Button from "./Button"

export default function UpdateWeightGoal ({users, updateGoalWeight}) {

  const {goal_weight} = users.users[0]
  const placeholderString = `Current Goal Weight: ${goal_weight} lbs`
  return (
          <div class="card">
            <div class="card-content">
            <h4 class="update-title title is-5">Update your goal weight:</h4>
      <form onChange={(event)=>handleUpdatedWeightGoal(event)} className="mt-4">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input is-primary weight-input" type="number" placeholder={placeholderString}/>
          </div>
          <div class="control">
            <Button  type="submit" name="Update"/>
          </div>
        
        </div>
      </form>
      </div> </div> 
  )

  function handleUpdatedWeightGoal (event) {
    updateGoalWeight(event)
  }
}