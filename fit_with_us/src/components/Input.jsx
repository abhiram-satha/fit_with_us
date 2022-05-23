import React from "react";

export default function Input(props) {
  let inputTypeElement = "";

  switch (props.inputType) {
    case "input":
      inputTypeElement = (
        <input
          class={props.class ? props.class : props.inputType}
          type={props.type}
          placeholder={props.placeholder}
        />
      );
      break;
    case "textarea":
      inputTypeElement = (
        <textarea
          class={props.class ? props.class : props.inputType}
          type={props.type}
          placeholder={props.placeholder}
        />
      );
      break;
  }
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control">{inputTypeElement}</div>
      <p className="help is-danger">{props.help}</p>
    </div>
  );
}
