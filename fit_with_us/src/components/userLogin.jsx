import React from "react";
import Button from "./Button";
import FormCategory from "./FormCategory";
import axios from "axios";

export default function UserLogin(props) {
  const submitUserInformation = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const passwordConfirmation = e.target[2].value;
    const username = e.target[3].value;
    const currentWeight = e.target[4].value;
    const goalWeight = e.target[5].value;
    const height = e.target[6].value;
    const age = e.target[7].value;

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
    ])
      .then((all) => {
        console.log("Successfuilly sent");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <form
      onSubmit={submitUserInformation}
      action="http://localhost:8080/api/user"
      method="GET"
    >
      <FormCategory id="user-email" name="email" type="email" />
      <FormCategory id="user-password" name="password" type="password" />
      <Button name="Login" />
    </form>
  );
}
