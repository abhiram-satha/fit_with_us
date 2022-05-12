import React from "react";
import Button from "./Button";

export default function Form(props) {

  let inputTypeElement = "";

  switch (props.inputType) {
    case "input":
      inputTypeElement = <input class="input" type={props.type} placeholder={props.placeholder} />
      break;
    case "textarea":
      inputTypeElement = <textarea class="textarea" type={props.type} placeholder={props.placeholder} />
      break;     
  }
  return (
    <form onSubmit={props.onSubmit}>
      <div class="field">
        <label class="label">{props.label}</label>
        <div class="control">
        {inputTypeElement}
      </div>
      <p class="help">{props.help}</p>
    </div>
    {/* <Button name={props.buttonName} /> */}
    </form>
  );
}
