import React from "react";

export default function Button({onClick, name}) {
  return <button onClick={e=>onClick(e)}>{name}</button>;
}
