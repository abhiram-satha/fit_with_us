import React, { useState, useEffect } from "react";
import axios from "axios";
import Badge from "./Badge";
import TableRow from "./TableRow";

export default function UserProfile({ user, badges }) {
  //States
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  //User Information
  const userID = user.users ? user.users[0].id : null;
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
    const fetchTotalComents = async () => await getTotalComments();
    fetchTotalComents()
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
        <h2 className="title is-6">Badges Earned by User:</h2>
        <div className="columns is-mobile is-centered">
          {createBadgesIconsArray}
        </div>
      </div>
      <div className="column"></div>
    </div>
  );
}
