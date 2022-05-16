import React, { useState, useEffect } from "react";
import axios from "axios";
import Badge from "./Badge";

export default function UserProfile({ user, weight }) {
  const [badges, setBadges] = useState([]);

  //Helper Function
  const getBadges = async () => {
    return await axios.get("http://localhost:8080/api/badges");
  };

  const createBadgesIconsArray = badges.map((badge) => {
    return <Badge key={badge.id} img_url={badge.img_url} name={badge.name} />;
  });

  useEffect(() => {
    const fetchBadgeData = async () => await getBadges();

    fetchBadgeData()
      .then((all) => setBadges(all.data.badges))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>{`User Profile for ${user.users[0].username}, they weigh ${weight[0].weight} lbs`}</h1>
      {createBadgesIconsArray}
    </>
  );
}
