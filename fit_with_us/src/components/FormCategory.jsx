import React from "react";
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

  const categoryName = textName(props.name);

  return (
    <div className="form-example">
      <label htmlFor={props.name}>
        Enter your {categoryName}{" "}
        {categoryName.includes("weight") ? "(lb)" : null}
        {categoryName.includes("height") ? "(cm)" : null}
      </label>
      {inputList ? (
        <select
          name={props.name}
          id={props.id ? props.id : props.name}
          size={props.size ? inputList.length : false}
          multiple={props.size ? true : false}
        >
          {inputList}
        </select>
      ) : (
        <input
          type={props.type}
          name={props.name}
          id={props.id ? props.id : props.name}
        />
      )}
    </div>
  );
}
