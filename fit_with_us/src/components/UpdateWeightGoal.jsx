import Button from "./Button"

export default function UpdateWeightGoal ({users, updateGoalWeight}) {
// console.log(users)
  const {goal_weight} = users.users[0]
  const placeholderString = `Current Goal Weight: ${goal_weight} lbs`
  return (
    <>
        <div class="column">
          <div class="card">
            <div class="card-content">
      <form onSubmit={(event)=>handleUpdatedWeightGoal(event)}>
        <input className="input is-primary weight-input" type="number" placeholder={placeholderString}/>
        <input type="submit" name="Update Goal Weight" className="button is-primary"></input>
        {/* <Button  type="submit" name="Update Goal Weight"/> */}
      </form>
      </div> </div> </div>
    </>
  )

  function handleUpdatedWeightGoal (event) {
    updateGoalWeight(event)
  }
}