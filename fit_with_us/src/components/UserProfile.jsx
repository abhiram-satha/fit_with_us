import React, { useState, useEffect } from "react";
import axios from "axios";
import Badge from "./Badge";

export default function UserProfile({ user, badges }) {
  const username = user.users ? user.users[0].username : null;

  //Helper Function
  const createBadgesIconsArray = badges.map((badge) => {
    return <Badge key={badge.id} img_url={badge.img_url} name={badge.name} />;
  });

  return (
    <>
      <h1>{`User Profile for ${username}`}</h1>
      {createBadgesIconsArray}
    </>
  );
}
