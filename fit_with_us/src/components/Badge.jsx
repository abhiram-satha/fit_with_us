import React from "react";

export default function Badge({ img_url, name, badgeClass }) {
  return (
    <div className={`column ${badgeClass}`}>
      <img className="image is-32x32" src={img_url} alt={name} />
      <span>{`${name}`}</span>
    </div>
  );
}
