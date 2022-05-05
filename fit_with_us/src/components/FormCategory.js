import React from "react";

export default function FormCategory(props) {
  //Helper Function

  return (
    <div className="form-example">
      <label htmlFor={props.name}>Enter your {props.name}: </label>
      <input type={props.type} name={props.name} id={props.name} />
    </div>
  );
}
