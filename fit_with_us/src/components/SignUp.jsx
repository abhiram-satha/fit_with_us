import React, { useState, useEffect } from "react";
import FormCategory from "./FormCategory";
import Button from "./Button";
import axios from "axios";

export default function Form(props) {
  //States
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);

  //Helper Functions
  const submitUserInformation = (e) => {
    //Reset States
    setErrorEmail(false);
    setErrorUsername(false);

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

    //Check Username
    Promise.all([
      axios.get("http://localhost:8080/api/usernameCheck", { params }),
    ])
      .then((all) => {
        const userData = all[0].data.users;
        if (userData.length !== 0) {
          return setErrorUsername(true);
        }
      })
      .then((all) => {
        //Check Email
        Promise.all([
          axios.get("http://localhost:8080/api/emailCheck", { params }),
        ]).then((all) => {
          const userData = all[0].data.users;
          if (userData.length !== 0) {
            return setErrorEmail(true);
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
            console.log("From cookie set!");
            console.log(all);
            const userData = all[0].data.users;
            const user = userData[0];
            if (userData.length !== 0) {
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
      <FormCategory name="email" type="email" />
      {errorEmail ? "Error email is already used!" : null}
      <FormCategory name="password" type="password" />
      <FormCategory name="passwordConfirmation" type="password" />
      <FormCategory name="username" type="text" />
      {errorUsername ? "Error username is already used!" : null}
      <FormCategory name="currentWeight" type="number" />
      <FormCategory name="goalWeight" type="number" />
      <FormCategory name="height" type="number" />
      <FormCategory name="age" type="number" />
      <Button name="Submit" />
    </form>
  );
}
