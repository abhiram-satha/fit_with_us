import React from "react";
import FormCategory from "./FormCategory";
import Button from "./Button";

export default function Form(props) {
  return (
    <form>
      <FormCategory name="email" type="email" />
      <FormCategory name="password" type="password" />
      <FormCategory name="current-weight" type="number" />
      <FormCategory name="goal-weight" type="number" />
      <FormCategory name="height" type="number" />
      <FormCategory name="age" type="number" />
      <Button />
    </form>
  );
}
