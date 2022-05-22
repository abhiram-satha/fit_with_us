import Button from "./Button";

export default function UpdateWeightGoal({ users, updateGoalWeight }) {
  const { goal_weight } = users.users[0];
  const placeholderString = `Current Goal Weight: ${goal_weight} lbs`;
  return (
    <div className="card mb-4">
      <div className="card-content">
        <h4 className="update-title title is-5">Update your goal weight:</h4>
        <form
          onChange={(event) => handleUpdatedWeightGoal(event)}
          className="mt-4"
        >
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input is-primary weight-input"
                type="number"
                placeholder={placeholderString}
              />
            </div>
            {/* <div className="control">
              <Button type="submit" name="Update" />
            </div> */}
          </div>
        </form>
      </div>{" "}
    </div>
  );

  function handleUpdatedWeightGoal(event) {
    updateGoalWeight(event);
  }
}
