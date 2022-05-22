import Button from "./Button"

export default function UpdateWeightGoal ({users, updateGoalWeight}) {

  const {goal_weight} = users.users[0]
  const placeholderString = `Current Goal Weight: ${goal_weight} lbs`
  return (
          <div className="card">
            <div className="card-content">
            <p className="update-title">Update Your Goal Weight:</p>
      <form onChange={(event)=>handleUpdatedWeightGoal(event)} className="mt-4">
        <div className="field has-addons">
        <div className="control is-expanded">
        <input className="input is-primary weight-input" type="number" placeholder={placeholderString}/>
        <div className="control">
        {/* <input type="submit" name="Update Goal Weight" className="button is-primary"></input> */}
        </div>
        {/* <Button  type="submit" name="Update Goal Weight"/> */}
        </div></div>
      </form>
      </div> </div> 
  )

  function handleUpdatedWeightGoal (event) {
    updateGoalWeight(event)
  }
}