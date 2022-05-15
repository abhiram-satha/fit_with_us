import React from "react";
import FormCategory from "./FormCategory";
import Button from "./Button";

export default function UserWeightEntry(props) {
  const submitNewWeight = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={submitNewWeight}>
      <FormCategory type="number" />
      <Button />
    </form>
  );
}
