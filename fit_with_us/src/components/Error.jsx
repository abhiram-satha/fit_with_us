import React from "react";
import ErrorMessage from "./ErrorMessage";

export default function Error(props) {
  return (
    <ul>
      <ErrorMessage message={props.errorMessages} />
    </ul>
  );
}
