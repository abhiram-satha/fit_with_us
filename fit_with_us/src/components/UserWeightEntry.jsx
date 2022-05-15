import React, { useState, useEffect } from "react";
import axios from "axios";
import FormCategory from "./FormCategory";
import ErrorMessage from "./ErrorMessage";
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
    }
  };

  const submitNewWeight = async (e) => {
    //Reset states
    setErrorWeight(false);
    setSuccessPost(false);
    setWeightClass("input");

    e.preventDefault();

    const userWeightEntry = e.target[0].value;
    console.log(userWeightEntry);
    console.log(userID);

    await postUserWeight(userID, userWeightEntry).catch((err) =>
      console.log(err)
    );
  };
  return (
    <form onSubmit={submitNewWeight}>
      <FormCategory name="currentWeight" type="number" class={weightClass} />
      <Button name="Submit" />
    </form>
  );
}
