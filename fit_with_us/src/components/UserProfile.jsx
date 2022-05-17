import React, { useState, useEffect } from "react";
import axios from "axios";
import Badge from "./Badge";
import TableRow from "./TableRow";

export default function UserProfile({ user, badges }) {
  console.log(user);
  const username = user.users ? user.users[0].username : null;
  const age = user.users ? user.users[0].age : null;
  const gender = user.users ? user.users[0].gender : null;
  const currentWeight = user.users ? user.users[0].current_weight : null;
  const goalWeight = user.users ? user.users[0].goal_weight : null;
  const height = user.users ? user.users[0].height : null;

  //Helper Function
  const createBadgesIconsArray = badges.map((badge) => {
    return <Badge key={badge.id} img_url={badge.img_url} name={badge.name} />;
  });

  return (
    <div className="columns is-mobile mt-6">
      <div className="column">
        <h1 className="title is-5 has-text-centered">{`User Profile for ${username}`}</h1>
        <h2 className="title is-6">User Information</h2>
        <table class="table is-striped is-fullwidth">
          <tbody>
            <TableRow name="Age" value={age} />
            <TableRow name="Gender" value={gender} />
            <TableRow name="Current Weight (lb):" value={currentWeight} />
            <TableRow name="Goal Weight (lb):" value={goalWeight} />
            <TableRow name="Height (cm):" value={height} />
          </tbody>
        </table>
        <h2 className="title is-6">Badges Earned by User:</h2>
        <p>{createBadgesIconsArray}</p>
      </div>
    </div>
  );
}
