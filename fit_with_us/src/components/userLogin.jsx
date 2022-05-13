import React, { useState } from "react";
import Button from "./Button";
import FormCategory from "./FormCategory";
import axios from "axios";
import Error from "./Error";

export default function UserLogin(props) {
  const [errorLogin, setErrorLogin] = useState(false);

  const submitUserInformation = (e) => {
    e.preventDefault();
    setErrorLogin(false);
    const params = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    Promise.all([axios.get("http://localhost:8080/api/user", { params })])
      .then((all) => {
        const userData = all[0].data.users;
        const user = userData[0];
        if (userData.length !== 0) {
          const errorInformation = props.loggedInUser(user.id);
          if (errorInformation) {
            setErrorLogin(errorInformation);
          }
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
      {errorLogin ? <Error message={errorLogin} /> : null}
      {`Value is ${errorLogin}`}
      <Button name="Login" />
    </form>
  );
}
