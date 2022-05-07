import React, { useState, useEffect } from "react";
import FormCategory from "./FormCategory";
import Button from "./Button";
import axios from "axios";

export default function Form(props) {
  const [show, setShow] = useState(true);

  //Helper Functions
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
        setShow(false);
      })
      .catch((err) => console.log(err.message));
  };

  return show ? (
    <form
      onSubmit={submitUserInformation}
      action="http://localhost:8080/api/user"
      method="POST"
    >
      <FormCategory name="email" type="email" />
      <FormCategory name="password" type="password" />
      <FormCategory name="passwordConfirmation" type="password" />
      <FormCategory name="username" type="text" />
      <FormCategory name="currentWeight" type="number" />
      <FormCategory name="goalWeight" type="number" />
      <FormCategory name="height" type="number" />
      <FormCategory name="age" type="number" />
      <Button name="Submit" />
    </form>
  ) : (
    <div></div>
  );
}
