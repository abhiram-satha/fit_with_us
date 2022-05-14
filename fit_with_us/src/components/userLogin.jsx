import React, { useState } from "react";
import Button from "./Button";
import FormCategory from "./FormCategory";
import axios from "axios";
import Error from "./Error";

export default function UserLogin(props) {
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [emailClass, setEmailClass] = useState("input");
  const [passwordClass, setPasswordClass] = useState("input");

  //Function to handle submit
  const submitUserInformation = (e) => {
    e.preventDefault();

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

    Promise.all([axios.get("http://localhost:8080/api/users", { params })])
      .then((all) => {
        const userData = all[0].data.users;
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
    <form
      onSubmit={submitUserInformation}
      action="http://localhost:8080/api/users"
      method="GET"
    >
      <FormCategory
        class={emailClass}
        id="user-email"
        name="email"
        type="email"
      />

      {errorEmail ? <Error errorMessage="Email is incorrect" /> : null}

      <FormCategory
        class={passwordClass}
        id="user-password"
        name="password"
        type="password"
      />
      {errorPassword ? <Error errorMessage="Password is incorrect" /> : null}
      <Button name="Login" />
    </form>
  );
}
