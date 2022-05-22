import axios from "axios";
import React, { useEffect, useState } from "react";
import FormCategory from "./FormCategory";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import UpdateCategoryPref from "./UpdateCategoryPref";

export default function UserDietaryRestrictions({
  userID,
  setUserHasRestrictions,
  selectedCategories,
  deleteCategory,
  addCategory,
}) {
  //States
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
    const params = { user_id: userID, restriction: string };

    await axios.post("http://localhost:8080/api/dietary_restrictions", params);
  }

  //Create food allergy options for form
  let dietaryID = 0;
  const dietaryRestrictionsOptions = dietaryRestrictions.map((restriction) => {
    dietaryID++;

    return <FormCategory key={dietaryID} name={restriction} />;
  });

  //Creates list of checked dietary restrictions from form
  const createUserDietaryRestrictionValues = (dietarySubmission) => {
    const listOfUserValues = [];
    const numberOfOptions = dietaryRestrictions.length;

    for (let i = 0; i < numberOfOptions - 1; i++) {
      if (dietarySubmission[i].checked) {
        listOfUserValues.push(dietarySubmission[i].value);
      }
    }

    return listOfUserValues;
  };

  const submitUserInformation = async (e) => {
    e.preventDefault();

    const userDietaryRestrictionsInput = createUserDietaryRestrictionValues(
      e.target
    );

    const checkCurrentOptions = async () => {
      await userDietaryRestrictionsInput.map(async (restriction) => {
        await createUsersDietaryRestrictions(restriction);
      });
    };

    checkCurrentOptions()
      .then(() => {
        setUserHasRestrictions(true);
        navigate("/homepage");
        window.location.reload(false);
      })
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
    <section className="section">
      <UpdateCategoryPref
        deleteCategory={deleteCategory}
        selectedCategories={selectedCategories}
        addCategory={addCategory}
      />

      <form
        onSubmit={submitUserInformation}
        action="http://localhost:8080/api/dietary_restrictions"
        method="POST"
      >
        <div className="card restrictions-card mb-4">
          <h3 className="title is-5">
            Let us know if you have any food allergies.
          </h3>
          {dietaryRestrictionsOptions}
        </div>
        <Button name="Submit" />
      </form>
    </section>
  );
}
