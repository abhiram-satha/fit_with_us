import React from "react";

export default function TableRow({ name, value }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
}
