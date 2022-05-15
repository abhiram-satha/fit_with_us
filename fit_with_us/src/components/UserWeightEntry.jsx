import React, { useState, useEffect } from "react";
import axios from "axios";
import FormCategory from "./FormCategory";
import Error from "./Error";
import Button from "./Button";

export default function UserWeightEntry({ userID }) {
  const [errorWeight, setErrorWeight] = useState(false);
  const [weightClass, setWeightClass] = useState("input");
  const [successPost, setSuccessPost] = useState(false);

  //Helper Functions

  //Enter user weight into database
  const postUserWeight = async (id, weight) => {
    await axios
      .post(`http://localhost:8080/api/weights`, {
        user_id: id,
        weight: weight,
      })
      .catch((err) => console.log(err));
  };

  const checkWeightEntry = (weight) => {
    if (weight === "") {
      setErrorWeight("Input cannot be blank");
      return false;
    }
    return true;
  };

  const submitNewWeight = async (e) => {
    //Reset states
    setErrorWeight(false);
    setSuccessPost(false);
    setWeightClass("input");

    e.preventDefault();

    const userWeightEntry = e.target[0].value;

    if (checkWeightEntry(userWeightEntry)) {
      postUserWeight(userID, userWeightEntry)
        .then(() => setSuccessPost("SUCCESSFULLY POSTED!"))
        .catch((err) => console.log(err));
    }
  };
  return (
    <form onSubmit={submitNewWeight}>
      {successPost ? `${successPost}` : null}
      <FormCategory name="currentWeight" type="number" class={weightClass} />
      {errorWeight ? <Error errorMessage={errorWeight} /> : null}
      <Button name="Submit" />
    </form>
  );
}
