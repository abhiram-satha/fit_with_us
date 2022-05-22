import axios from "axios";
import React, { useEffect, useState } from "react";
import FormCategory from "./FormCategory";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function UserDietaryRestrictions({
  userID,
  setUserHasRestrictions,
  selectedCategories,
  setSelectedCategories,
  deleteCategory,
  addCategory,
}) {
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
    const params = { user_id: userID, restriction: string };

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
      .then(() => {
        setUserHasRestrictions(true);
        navigate("/homepage");
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  let unique_category = [];
  const unique_categories = (selectedCategories) => {
    selectedCategories.forEach((c) => {
      if (!unique_category.includes(c)) {
        unique_category.push(c);
      }
    });
  };
  unique_categories(selectedCategories);

  function handleSelect(event, category) {
    if (selectedCategories.includes(category)) {
      deleteCategory(event, category);
    } else {
      addCategory(event, category);
    }
  }

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
      <form
        onSubmit={submitUserInformation}
        action="http://localhost:8080/api/dietary_restrictions"
        method="POST"
      >
        <div id="restrictions-card" className="card">
          <h3 className="title is-5">
            What kinds of recipes would you like to see?
          </h3>
          <label className="checkbox" for="1">
            <input
              type="checkbox"
              value="1"
              checked={selectedCategories.includes("chicken")}
              onChange={(event) => handleSelect(event, "chicken")}
            />
            &nbsp;Recipes including chicken
          </label>
          <br />
          <label className="checkbox" for="2">
            <input
              type="checkbox"
              value="2"
              checked={selectedCategories.includes("fish")}
              onChange={(event) => handleSelect(event, "fish")}
            />
            &nbsp;Recipes including fish
          </label>
          <br />
          <label className="checkbox" for="3">
            <input
              type="checkbox"
              value="3"
              checked={selectedCategories.includes("beef")}
              onChange={(event) => handleSelect(event, "beef")}
            />
            &nbsp;Recipes including beef
          </label>
          <br />
          <label className="checkbox" for="4">
            <input
              type="checkbox"
              value="4"
              checked={selectedCategories.includes("pork")}
              onChange={(event) => handleSelect(event, "pork")}
            />
            &nbsp;Recipes including pork
          </label>
          <br />
          <label className="checkbox" for="5">
            <input
              type="checkbox"
              value="5"
              checked={selectedCategories.includes("vegetarian")}
              onChange={(event) => handleSelect(event, "vegetarian")}
            />
            &nbsp;Vegetarian recipes
          </label>
          <br />
          <label className="checkbox" for="6">
            <input
              type="checkbox"
              value="6"
              checked={selectedCategories.includes("vegan")}
              onChange={(event) => handleSelect(event, "vegan")}
            />
            &nbsp;Vegan recipes
          </label>
        </div>
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
    </section>
  );
}
