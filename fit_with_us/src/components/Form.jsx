import React from "react";
import Button from "./Button";

export default function Form(props) {
  let inputTypeElement = "";

  switch (props.inputType) {
    case "input":
      inputTypeElement = (
        <input
          className="input"
          type={props.type}
          placeholder={props.placeholder}
        />
      );
      break;
    case "textarea":
      inputTypeElement = (
        <textarea
          className="textarea"
          type={props.type}
          placeholder={props.placeholder}
        />
      );
      break;
  }
  return (
    <form onSubmit={props.onSubmit}>
      <div className="field">
        <label className="label">{props.label}</label>
        <div className="control">{inputTypeElement}</div>
        <p className="help">{props.help}</p>
      </div>
      {/* <Button name={props.buttonName} /> */}
    </form>
  );
}
