export default function Settings({users, updateGoalWeight}) {

  const {goal_weight} = users.users[0]

  return (
    <>
    This is the settings form
      <form onSubmit={updateGoalWeight}>
        <input type="number" placeholder={goal_weight} />
        <input type="submit" name="Update Goal Weight"></input>
      </form>
    </>
  )
}