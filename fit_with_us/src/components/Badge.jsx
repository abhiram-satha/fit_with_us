import React from "react";

export default function Badge({
  img_url,
  id_name,
  description,
  name,
  badgeClass,
}) {
  return (
    <div
      className={`badge column is-flex is-flex-direction-column is-align-items-center is-one-third ${badgeClass}`}
    >
      <button>
        <img className="image is-32x32" src={img_url} alt={name} />
      </button>
      <span>{`${name}`}</span>
    </div>
  );
}
