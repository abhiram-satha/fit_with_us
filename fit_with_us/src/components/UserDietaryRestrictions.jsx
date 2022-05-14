import axios from "axios";
import React, { useEffect, useState } from "react";
import FormCategory from "./FormCategory";
import Button from "./Button";

export default function UserDietaryRestrictions(props) {
  //States
  const [currentOptionsValue, setCurrentOptionsValues] = useState(["None"]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);

  //Helper Functions
  async function getDietaryRestrictions() {
    const response = await axios.get(
      "http://localhost:8080/api/dietary_restrictions"
    );

    const dietaryRestrictionsArray = response["data"]["dietary_restrictions"];
    return dietaryRestrictionsArray;
  }

  async function createUsersDietaryRestrictions(string) {
    const params = { user_id: props.userID, restriction: string[0] };

    await axios.post("http://localhost:8080/api/dietary_restrictions", params);
  }

  function addToOptionsList(e) {
    const numberOfOptions = dietaryRestrictions.length;
    const selectedList = [];

    console.log(numberOfOptions);

    for (let i = 0; i < numberOfOptions; i++) {
      if (e.target[i].selected) {
        selectedList.push(e.target[i].value);
      }
    }
    setCurrentOptionsValues(selectedList);
  }

  const submitUserInformation = async (e) => {
    e.preventDefault();
    await createUsersDietaryRestrictions(currentOptionsValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      const dietaryRestrictions = await getDietaryRestrictions();
      const dietaryRestrictionsArray = dietaryRestrictions.map(
        (restriction) => restriction.restriction
      );
      setDietaryRestrictions(dietaryRestrictionsArray);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  return (
    <form
      onSubmit={submitUserInformation}
      action="http://localhost:8080/api/dietary_restrictions"
      method="POST"
    >
      <FormCategory
        onChange={addToOptionsList}
        optionsName="dietary-choices"
        name="dietaryRestrictions"
        options={dietaryRestrictions}
        size={true}
        value={currentOptionsValue}
      />

      <Button name="Submit" />
    </form>
  );
}
