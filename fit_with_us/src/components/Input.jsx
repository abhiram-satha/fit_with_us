import React from "react";

export default function Input(props) {

  let inputTypeElement = "";

  switch (props.inputType) {
    case "input":
      inputTypeElement = <input class={props.inputType} type={props.type} placeholder={props.placeholder} />
      break;
    case "textarea":
      inputTypeElement = <textarea class="textarea" type={props.type} placeholder={props.placeholder} />
      break;     
  }
  return (
      <div class="field">
        <label class="label">{props.label}</label>
        <div class="control">
          {inputTypeElement}
        </div>
      <p class="help is-danger">{props.help}</p>
    </div>
  );
}
