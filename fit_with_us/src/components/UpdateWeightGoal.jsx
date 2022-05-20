import Button from "./Button"

export default function UpdateWeightGoal ({users, updateGoalWeight}) {
// console.log(users)
  // const {goal_weight} = users.users[0]

  return (
    <>
      <form onSubmit={(event)=>handleUpdatedWeightGoal(event)}>
        <input className="input is-primary" type="number" />
        <input type="submit" name="Update Goal Weight"></input>
        {/* <Button  type="submit" name="Update Goal Weight"/> */}
      </form>
    </>
  )

  function handleUpdatedWeightGoal (event) {
    updateGoalWeight(event)
  }
}