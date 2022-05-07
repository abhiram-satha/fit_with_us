import React, { useState, useEffect } from "react";
import FormCategory from "./FormCategory";
import Button from "./Button";
import axios from "axios";

export default function Form(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    username: "",
    currentWeight: 0,
    goalWeight: 0,
    height: 0,
    age: 0,
  });

  //Helper setter functions
  const setEmail = (email) => setState({ ...state, email });
  const setPassword = (password) => setState({ ...state, password });
  const setPasswordConfirmation = (passwordConfirmation) =>
    setState({ ...state, passwordConfirmation });
  const setUsername = (username) => setState({ ...state, username });
  const setCurrentWeight = (currentWeight) =>
    setState({ ...state, currentWeight });
  const setGoalWeight = (goalWeight) => setState({ ...state, goalWeight });
  const setHeight = (height) => setState({ ...state, height });
  const setAge = (age) => setState({ ...state, age });

  const submitUserInformation = (e) => {
    e.preventDefault();
    console.log(e);
    // Promise.all([
    //   axios.post("http://localhost:8080/api/user", {
    //     email,
    //     password,
    //     username,
    //     currentWeight,
    //     goalWeight,
    //     height,
    //     age,
    //   }),
    // ])
    //   .then((all) => {
    //     console.log("Successfuilly sent");
    //   })
    //   .catch((err) => console.log(err.message));
  };

  return (
    <form
      onSubmit={submitUserInformation}
      action="http://localhost:8080/api/user"
      method="POST"
    >
      <FormCategory
        onChange={setEmail}
        name="email"
        type="email"
        value={state.email}
      />
      <FormCategory
        onChange={setPassword}
        name="password"
        type="password"
        value={state.password}
      />
      <FormCategory
        onChange={setPasswordConfirmation}
        name="passwordConfirmation"
        type="password"
        value={state.passwordConfirmation}
      />
      <FormCategory
        onChange={setUsername}
        name="username"
        type="text"
        value={state.username}
      />
      <FormCategory
        onChange={setCurrentWeight}
        name="currentWeight"
        type="number"
        value={state.currentWeight}
      />
      <FormCategory
        onChange={setGoalWeight}
        name="goalWeight"
        type="number"
        value={state.goalWeight}
      />
      <FormCategory
        onChange={setHeight}
        name="height"
        type="number"
        value={state.height}
      />
      <FormCategory
        onChange={setAge}
        name="age"
        type="number"
        value={state.age}
      />
      <Button type="submit" name="Submit" />
    </form>
  );
}
