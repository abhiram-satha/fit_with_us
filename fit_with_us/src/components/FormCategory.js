import React from "react";

export default function FormCategory(props) {
  //Helper Function
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

  const categoryName = textName(props.name);

  return (
    <div className="form-example">
      <label htmlFor={props.name}>Enter your {categoryName}: </label>
      <input type={props.type} name={props.name} id={props.name} />
    </div>
  );
}
