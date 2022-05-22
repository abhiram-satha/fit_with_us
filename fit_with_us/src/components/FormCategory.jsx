import React, { useState, useEffect } from "react";

export default function FormCategory({ name }) {
  return (
    <>
      <label className="checkbox" htmlFor={name}>
        <input type="checkbox" value={name} />
        &nbsp;{name}
      </label>
      <br />
    </>
  );
}
