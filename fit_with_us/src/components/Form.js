import React from "react";
import FormCategory from "./FormCategory";
import Button from "./Button";

export default function Form(props) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form action="http://localhost:8080/api/user" method="POST">
      <FormCategory name="email" type="email" />
      <FormCategory name="password" type="password" />
      <FormCategory name="passwordConfirmation" type="password" />
      <FormCategory name="currentWeight" type="number" />
      <FormCategory name="goalWeight" type="number" />
      <FormCategory name="height" type="number" />
      <FormCategory name="age" type="number" />
      <Button name="Submit" />
    </form>
  );
}
