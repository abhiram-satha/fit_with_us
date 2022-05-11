import React from "react";
import Button from "./Button";

export default function Form(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <div class="field">
        <label class="label">{props.label}</label>
        <div class="control">
        <input class="input" type={props.type} placeholder={props.placeholder} />
      </div>
      <p class="help">{props.help}</p>
    </div>
    </form>
  );
}
