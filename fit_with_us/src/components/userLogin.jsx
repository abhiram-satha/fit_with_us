import React from "react";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import "../styles/UserLogin.scss"

export default function UserLogin(props) {
  const submitUserInformation = (e) => {
    e.preventDefault();
    const params = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    Promise.all([axios.get("http://localhost:8080/api/user", { params })])
      .then((all) => {
        const userData = all[0].data.users;
        const user = userData[0];
        console.log(user);
        console.log(all[0].data);
        if (userData.length !== 0) {
          props.loggedInUser(user.id);
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div class="columns is-mobile is-centered login-panel">
      <div class="column is-four-fifths">
        <figure class="image is-square">
          <img src="https://i.imgur.com/1EehYbk.png"></img>
        </figure>
        <form onSubmit={submitUserInformation} action="http://localhost:8080/api/user" method="GET">
          <Input id="user-email" inputType="input" name="email" type="email" placeholder="Enter your email"/>
          <Input id="user-password" inputType="input" name="password" type="password" placeholder="Enter your password"/>
          <br />
          <br />
          <Button  name="Login" />
        </form>
      </div>
    </div>
  );
}
