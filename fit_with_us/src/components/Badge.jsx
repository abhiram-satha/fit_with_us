import React from "react";

export default function Badge({ img_url, name }) {
  return <img className="image is-32x32" src={img_url} alt={name} />;
}
