import React, { useState, useEffect } from "react";
import FormOptions from "./FormOptions";

export default function FormCategory(props) {
  //Helper Functions
  function textName(name) {
    let newName = name;
    for (let i = 0; i < name.length; i++) {
      if (newName[i] === newName[i].toUpperCase()) {
        newName =
          newName.slice(0, i) +
          " " +
          newName[i].toLowerCase() +
          newName.slice(i + 1);
        return newName;
      }
    }

    return newName;
  }

  let keyID = 0;
  const inputList = props.options
    ? props.options.map((value) => {
        keyID++;
        return <FormOptions key={keyID} value={value} />;
      })
    : null;

    const labelize = (label) => {
      return label[0].toUpperCase() + label.slice(1, label.length)
    }

  return (
    <div class="field">
      <label htmlFor={props.name} class="label">
        {labelize(props.name)}
      </label>
      {inputList ? (
        <select
          onChange={props.onChange}
          name={props.name}
          id={props.id ? props.id : props.name}
          size={props.size ? inputList.length : 0}
          multiple={props.size ? true : false}
          value={props.currentOptionsValue}
        >
          {inputList}
        </select>
      ) : (
        <input
          class={props.class}
          type={props.type}
          name={props.name}
          id={props.id ? props.id : props.name}
        />
      )}
    </div>
  );
}
