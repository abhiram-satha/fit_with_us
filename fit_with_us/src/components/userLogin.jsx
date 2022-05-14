import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import "../styles/UserLogin.scss"
import Error from "./Error";

export default function UserLogin(props) {

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [emailClass, setEmailClass] = useState("input");
  const [passwordClass, setPasswordClass] = useState("input");

  //Function to handle submit
  const submitUserInformation = (e) => {
    e.preventDefault();
    console.log(e)

    //Resets all states before logic
    setErrorEmail(false);
    setErrorPassword(false);
    setEmailClass("input");
    setPasswordClass("input");

    //Set params to be sent to get user information
    const params = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    Promise.all([axios.get("http://localhost:8080/api/user", { params })])
      .then((all) => {
        const userData = all[0].data.users;
        console.log(userData)
        const user = userData[0];
        if (userData.length !== 0) {
          const errorInformation = props.loggedInUser(user.id);
          if (errorInformation === "The password is incorrect") {
            setPasswordClass("input is-danger");
            setErrorPassword(errorInformation);
          }

          if (errorInformation === "The email is incorrect") {
            setEmailClass("input is-danger");
            setErrorEmail(errorInformation);
          }
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
          <Input id="user-email" inputType="input" class={emailClass} name="email" type="email" placeholder="Enter your email" help={errorEmail}/>
          <Input id="user-password" inputType="input" class={passwordClass} name="password" type="password" placeholder="Enter your password" help={errorPassword}/>
          <br />
          <Button  name="Login" />
        </form>
      </div>
    </div>
  );
}
