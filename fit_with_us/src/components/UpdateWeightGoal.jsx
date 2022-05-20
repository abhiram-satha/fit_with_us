import Button from "./Button"

export default function UpdateWeightGoal ({users, updateGoalWeight}) {

  const {goal_weight} = users.users[0]

  return (
    <>
      <form onSubmit={updateGoalWeight}>
        <input type="number" placeholder= {goal_weight} />
        {/* <input type="submit" name="Update Goal Weight"></input> */}
        <Button onClick={updateGoalWeight} type="submit" name="Update Goal Weight"/>
      </form>
    </>
  )
}