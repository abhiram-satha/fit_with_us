import React, { useState, useEffect } from "react";
import FormCategory from "./FormCategory";
import Button from "./Button";
import axios from "axios";
import Error from "./Error";

export default function Form(props) {
  //States
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  //Helper Functions
  const checkEqualPasswords = (password, passwordConfirmation) => {
    if (password !== passwordConfirmation) {
      return true;
    }
    return false;
  };

  const checkEmail = (params) => {
    new Promise((resolve, reject) => {
      resolve(axios.get("http://localhost:8080/api/usernameCheck", { params }));
    });
  };

  const submitUserInformation = (e) => {
    //Reset States
    setErrorEmail(false);
    setErrorUsername(false);
    setErrorPassword(false);

    e.preventDefault();
    const params = {
      email: e.target[0].value,
      password: e.target[1].value,
      username: e.target[3].value,
    };

    const email = e.target[0].value;
    const password = e.target[1].value;
    const passwordConfirmation = e.target[2].value;
    const username = e.target[3].value;
    const currentWeight = e.target[4].value;
    const goalWeight = e.target[5].value;
    const height = e.target[6].value;
    const age = e.target[7].value;

    if (checkEqualPasswords(password, passwordConfirmation)) {
      return setErrorPassword("The passwords do not match");
    }

    //Check Username
    Promise.all([
      axios.get("http://localhost:8080/api/usernameCheck", { params }),
    ])
      .then((all) => {
        const userData = all[0].data.users;
        if (userData.length !== 0) {
          throw setErrorUsername("The username already exists");
        }
      })
      .then((all) => {
        //Check Email
        Promise.all([
          axios.get("http://localhost:8080/api/emailCheck", { params }),
        ]).then((all) => {
          const userData = all[0].data.users;
          if (userData.length !== 0) {
            throw setErrorEmail("The email already exists");
          }
        });
      })
      .then((all) => {
        //Makes entry into database
        Promise.all([
          axios.post("http://localhost:8080/api/user", {
            email,
            password,
            username,
            currentWeight,
            goalWeight,
            height,
            age,
          }),
        ]).then((all) => {});
      })
      .then((all) => {
        setTimeout(() => {
          Promise.all([
            axios.get("http://localhost:8080/api/user", { params }),
          ]).then((all) => {
            //Returns user ID
            const userData = all[0].data.users;
            const user = userData[0];
            if (
              userData.length !== 0 &&
              !errorEmail &&
              !errorUsername &&
              !errorPassword
            ) {
              props.loggedInUser(user.id);
            }
          });
        }, 100);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <form
      onSubmit={submitUserInformation}
      action="http://localhost:8080/api/user"
      method="POST"
    >
      {errorEmail || errorUsername || errorPassword ? (
        <details>
          <summary>Errors</summary>
          <Error
            errorMessages={
              errorEmail
                ? errorEmail
                : errorUsername
                ? errorUsername
                : errorPassword
            }
          />
        </details>
      ) : null}
      <FormCategory name="email" type="email" />
      <FormCategory name="password" type="password" />
      <FormCategory name="passwordConfirmation" type="password" />
      <FormCategory name="username" type="text" />
      <FormCategory name="currentWeight" type="number" />
      <FormCategory name="goalWeight" type="number" />
      <FormCategory name="height" type="number" />
      <FormCategory name="age" type="number" />
      <FormCategory
        optionsName="gender-choices"
        name="gender"
        options={["Male", "Female", "Prefer not to disclose"]}
      />
      <FormCategory
        optionsName="dietary-choices"
        name="dietaryRestrictions"
        options={["No Eggs", "Vegetarian", "No Dairy"]}
        size={true}
      />
      <Button name="Submit" />
    </form>
  );
}
