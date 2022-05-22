import React from "react";

export default function Button(props) {
  return (
    <button
      className="button is-primary"
      onClick={props.onClick}
      type={props.type}
    >
      {props.name}
      <i className={props.icon}></i>
    </button>
  );
}
