import React, { useState, useEffect } from "react";
import axios from "axios";
import Badge from "./Badge";
import TableRow from "./TableRow";
import "../styles/UserProfile.scss";

export default function UserProfile({ user, badges, weight }) {
  //States
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalWeight, setTotal] = useState(
    weight.length !== 0 ? weight.length : 0
  );

  //User Information
  const userID = user.users ? user.users[0].id : null;
  const username = user.users ? user.users[0].username : null;
  const age = user.users ? user.users[0].age : null;
  const gender = user.users ? user.users[0].gender : null;
  const currentWeight = user.users ? user.users[0].current_weight : null;
  const goalWeight = user.users ? user.users[0].goal_weight : null;
  const height = user.users ? user.users[0].height : null;

  //Goal Achievement Variables
  const achievedHighFiver = totalWeight >= 5;
  const achievedTens = totalWeight >= 10;
  const achievedChatter = totalPosts + totalComments >= 5;
  const userWeightType = currentWeight > goalWeight ? "loss" : "gain";
  const latestWeight = weight[weight.length - 1]
    ? weight[weight.length - 1].weight
    : null;

  const achievedWhatAStar =
    userWeightType === "loss" && latestWeight <= goalWeight
      ? true
      : userWeightType === "gain" && latestWeight >= goalWeight
      ? true
      : false;

  const achievedAlmostThereBud =
    userWeightType === "loss" && latestWeight - goalWeight <= 10
      ? true
      : userWeightType === "gain" && goalWeight - latestWeight <= 10
      ? true
      : false;

  //Helper Function
  const createBadgesIconsArray = badges.map((badge) => {
    //Checks for "What a Star" achievement
    if (badge.name === "What a star!" && achievedWhatAStar) {
      return <Badge key={badge.id} img_url={badge.img_url} name={badge.name} />;
    }

    //Checks for "High Fiver" achievement
    if (badge.name === "High Fiver" && achievedHighFiver) {
      return <Badge key={badge.id} img_url={badge.img_url} name={badge.name} />;
    }

    //Checks for "Tens!" achievement
    if (badge.name === "Tens!" && achievedTens) {
      return <Badge key={badge.id} img_url={badge.img_url} name={badge.name} />;
    }

    //Checks for "Chatter" achievement
    if (badge.name === "Chatter" && achievedChatter) {
      return <Badge key={badge.id} img_url={badge.img_url} name={badge.name} />;
    }

    //Checks for "Chatter" achievement
    if (badge.name === "Almost there, bud!" && achievedAlmostThereBud) {
      return <Badge key={badge.id} img_url={badge.img_url} name={badge.name} />;
    }

    return (
      <Badge
        key={badge.id}
        img_url={badge.img_url}
        name={badge.name}
        badgeClass="not-achieved"
      />
    );
  });

  const getTotalPosts = async () => {
    return await axios.get(`http://localhost:8080/api/posts/${userID}/all`, {
      userID,
    });
  };

  const getTotalComments = async () => {
    return await axios.get(`http://localhost:8080/api/comments/${userID}/all`, {
      userID,
    });
  };

  useEffect(() => {
    //Fetch Total Posts for Users
    const fetchTotalPosts = async () => await getTotalPosts();
    fetchTotalPosts()
      .then((response) => setTotalPosts(parseInt(response.data.total.count)))
      .catch((err) => console.log(err));

    //Fetch Total Comments for Users
    const fetchTotalComments = async () => await getTotalComments();
    fetchTotalComments()
      .then((response) => setTotalComments(parseInt(response.data.total.count)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="columns is-mobile mt-6">
      <div className="column"></div>
      <div className="column is-four-fifths">
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
        {createBadgesIconsArray.length !== 0 ? (
          <>
            <h2 className="title is-6">Badges Earned by User:</h2>
            <div className="columns is-flex is-flex-wrap-wrap is-mobile is-centered">
              {createBadgesIconsArray}
            </div>
          </>
        ) : null}
      </div>
      <div className="column"></div>
    </div>
  );
}
