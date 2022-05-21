import React, { useState } from "react";

export default function Badge({
  img_url,
  id_name,
  description,
  name,
  badgeClass,
}) {
  //States for Badge Modals
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <div
        className={`badge column is-flex is-flex-direction-column is-align-items-center is-one-third ${badgeClass}`}
      >
        <button
          onClick={() => setModalActive("is-active")}
          data-target={id_name}
        >
          <img className="image is-32x32" src={img_url} alt={name} />
        </button>
        <span>{`${name}`}</span>
      </div>

      <div
        id={id_name}
        class={`modal ${modalActive}`}
        onClick={() => setModalActive("")}
      >
        <div class="modal-background"></div>

        <div class="modal-content">
          <div class="box">
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
        </div>

        <button class="modal-close is-large" aria-label="close"></button>
      </div>
    </>
  );
}
