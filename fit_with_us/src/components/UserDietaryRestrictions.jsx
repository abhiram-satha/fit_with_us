import axios from "axios";
import React, { useEffect, useState } from "react";
import FormCategory from "./FormCategory";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function UserDietaryRestrictions(props) {
  //States
  const [currentOptionsValue, setCurrentOptionsValues] = useState(["None"]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);

  const navigate = useNavigate();

  //Helper Functions
  async function getDietaryRestrictions() {
    const response = await axios.get(
      "http://localhost:8080/api/dietary_restrictions"
    );

    const dietaryRestrictionsArray = response["data"]["dietary_restrictions"];
    return dietaryRestrictionsArray;
  }

  async function createUsersDietaryRestrictions(string) {
    const params = { user_id: props.userID, restriction: string };

    await axios.post("http://localhost:8080/api/dietary_restrictions", params);
  }

  function addToOptionsList(e) {
    const numberOfOptions = dietaryRestrictions.length;
    const selectedList = [];

    for (let i = 0; i < numberOfOptions; i++) {
      if (e.target[i].selected) {
        selectedList.push(e.target[i].value);
      }
    }
    setCurrentOptionsValues(selectedList);
  }

  const submitUserInformation = async (e) => {
    e.preventDefault();

    const checkCurrentOptions = async () => {
      await currentOptionsValue.map(async (restriction) => {
        await createUsersDietaryRestrictions(restriction);
      });
    };

    checkCurrentOptions()
      .then(() => props.setUserHasRestrictions(true))
      // .then(() => window.location.reload(false))
      .catch((err) => console.log(err));
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
