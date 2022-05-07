import React from "react";
import Button from "./Button";
import FormCategory from "./FormCategory";
import axios from "axios";

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
    <form
      onSubmit={submitUserInformation}
      action="http://localhost:8080/api/user"
      method="GET"
    >
      <FormCategory id="user-email" name="email" type="email" />
      <FormCategory id="user-password" name="password" type="password" />
      <Button name="Login" />
    </form>
  );
}
