import Button from "./Button"

export default function UpdateWeightGoal ({users, updateGoalWeight}) {
// console.log(users)
  const {goal_weight} = users.users[0]
  const placeholderString = `Current Goal Weight: ${goal_weight} lbs`
  return (
    <>
        <div className="column">
          <div className="card">
            <div className="card-content">
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
      </div> </div> </div>
    </>
  )

  function handleUpdatedWeightGoal (event) {
    updateGoalWeight(event)
  }
}