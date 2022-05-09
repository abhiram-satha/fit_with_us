import React, { useState, useEffect } from "react";
import FormCategory from "./FormCategory";
import Button from "./Button";
import axios from "axios";
import Error from "./Error";

export default function Form(props) {
  //Variables
  const currentDietaryRestrictions = [
    "None",
    "No Eggs",
    "Vegetarian",
    "No Dairy",
  ];

  //States
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [currentOptionsValue, setCurrentOptionsValues] = useState(["None"]);

  useEffect(() => {}, []);

  //Variables
  const gender = [];
  const dietaryRestrictions = [];

  //Helper Functions
  const checkEqualPasswords = async (password, passwordConfirmation) => {
    if (password === passwordConfirmation) {
      return true;
    }
    return false;
  };

  const getUserInformation = async () => {
    return await axios.get("http://localhost:8080/api/allUsers");
  };

  const checkForInformation = async (usersDatabase, value, userColumn) => {
    for (const user of usersDatabase) {
      if (user[userColumn] === value) {
        return true;
      }
    }
    return false;
  };

  const checkEmail = (params) => {
    new Promise((resolve, reject) => {
      resolve(axios.get("http://localhost:8080/api/usernameCheck", { params }));
    });
  };

  function addToOptionsList(e) {
    const numberOfOptions = currentDietaryRestrictions
      ? currentDietaryRestrictions.length
      : 0;
    const selectedList = [];

    for (let i = 0; i < numberOfOptions; i++) {
      if (e.target[i].selected) {
        selectedList.push(e.target[i].value);
      }
    }
    setCurrentOptionsValues(selectedList);
  }

  const submitUserInformation = (e) => {
    //Reset States
    setErrorEmail(false);
    setErrorUsername(false);
    setErrorPassword(false);

    e.preventDefault();
    const params = {
      email: e.target[0].value,
      password: e.target[1].value,
      username: e.target[3].value,
    };

    const email = e.target[0].value;
    const password = e.target[1].value;
    const passwordConfirmation = e.target[2].value;
    const username = e.target[3].value;
    const currentWeight = e.target[4].value;
    const goalWeight = e.target[5].value;
    const height = e.target[6].value;
    const age = e.target[7].value;
    const gender = e.target[8].value;
    const dietaryRestrictions = currentOptionsValue;

    //Grab User Information
    getUserInformation().then(async (result) => {
      //Check username
      const usersDatabase = result.data.users;
      const userExists = await checkForInformation(
        usersDatabase,
        username,
        "username"
      );
      const emailExists = await checkForInformation(
        usersDatabase,
        email,
        "email"
      );
      const passwordsMatch = await checkEqualPasswords(
        password,
        passwordConfirmation
      );

      if (userExists) {
        setErrorUsername("The username already exists");
      }

      if (emailExists) {
        setErrorEmail("The email already exists");
      }

      if (!passwordsMatch) {
        setErrorPassword("The passwords do not match");
      }

      console.log(errorUsername);
      console.log(errorEmail);
      console.log(errorPassword);

      if (!errorUsername && !errorEmail && !errorPassword) {
        console.log("posted");
        await axios.post("http://localhost:8080/api/user", {
          email,
          password,
          username,
          currentWeight,
          goalWeight,
          height,
          age,
        });
      }
      const response = await axios.get("http://localhost:8080/api/user", {
        params,
      });

      console.log(response);
      //Returns user ID
      const userData = response.data.users;
      const user = userData[0];
      console.log(user);
      if (!errorEmail && !errorUsername && !errorPassword) {
        props.loggedInUser(user.id);
      }
    });

    // //Check Username
    // Promise.all([
    //   axios.get("http://localhost:8080/api/usernameCheck", { params }),
    // ])
    //   .then((all) => {
    //     const userData = all[0].data.users;
    //     console.log("Value", userData);
    //     if (userData.length !== 0) {
    //       throw setErrorUsername("The username already exists");
    //     }
    //   })
    //   .then((all) => {
    //     //Check Email
    //     Promise.all([
    //       axios.get("http://localhost:8080/api/emailCheck", { params }),
    //     ]).then((all) => {
    //       const userData = all[0].data.users;
    //       if (userData.length !== 0) {
    //         throw setErrorEmail("The email already exists");
    //       }
    //     });
    //   })
    //   .then((all) => {
    //     //Makes entry into database
    //     Promise.all([
    //       axios.post("http://localhost:8080/api/user", {
    //         email,
    //         password,
    //         username,
    //         currentWeight,
    //         goalWeight,
    //         height,
    //         age,
    //       }),
    //     ]).then((all) => {});
    //   })
    //   .then((all) => {
    //     setTimeout(() => {
    //       Promise.all([
    //         axios.get("http://localhost:8080/api/user", { params }),
    //         axios.get("http://localhost:8080/api/allUsers"),
    //       ]).then((all) => {
    //         //Returns user ID
    //         const userData = all[0].data.users;
    //         const user = userData[0];
    //         const test = all[1].data;
    //         console.log(test);
    //         if (userData.length !== 0) {
    //           props.loggedInUser(user.id);
    //         }
    //       });
    //     }, 100);
    //   })
    //   .catch((err) => console.log(err.message));

    // //Check Username
    // Promise.all([
    //   axios.get("http://localhost:8080/api/usernameCheck", { params }),
    // ])
    //   .then((all) => {
    //     const userData = all[0].data.users;
    //     console.log(userData);
    //     if (userData.length !== 0) {
    //       throw setErrorUsername("The username already exists");
    //     }
    //   })
    //   .then((all) => {
    //     //Check Email
    //     Promise.all([
    //       axios.get("http://localhost:8080/api/emailCheck", { params }),
    //     ]).then((all) => {
    //       const userData = all[0].data.users;
    //       if (userData.length !== 0) {
    //         throw setErrorEmail("The email already exists");
    //       }
    //     });
    //   })
    //   // .then(async (all) => {
    //   //   //Makes entry into database
    //   //   await axios.post("http://localhost:8080/api/user", {
    //   //     email,
    //   //     password,
    //   //     username,
    //   //     currentWeight,
    //   //     goalWeight,
    //   //     height,
    //   //     age,
    //   //     gender,
    //   //     dietaryRestrictions,
    //   //   });

    //   //   const response = await axios.get("http://localhost:8080/api/user", {
    //   //     params,
    //   //   });
    //   //   //Returns user ID
    //   //   const userData = response[0].data.users;
    //   //   const user = userData[0];
    //   //   if (
    //   //     userData.length !== 0 &&
    //   //     !errorEmail &&
    //   //     !errorUsername &&
    //   //     !errorPassword
    //   //   ) {
    //   //     props.loggedInUser(user.id);
    //   //   }
    //   // })

    //   .then((all) => {
    //     Promise.all([
    //       axios.get("http://localhost:8080/api/user", { params }),
    //     ]).then((all) => {
    //       //Returns user ID
    //       const userData = all[0].data.users;
    //       const user = userData[0];
    //       if (
    //         userData.length !== 0 &&
    //         !errorEmail &&
    //         !errorUsername &&
    //         !errorPassword
    //       ) {
    //         props.loggedInUser(user.id);
    //       }
    //     });
    //   })
    //   .catch((err) => console.log(err.message));
  };

  return (
    <form
      onSubmit={submitUserInformation}
      action="http://localhost:8080/api/user"
      method="POST"
    >
      <FormCategory name="email" type="email" />
      {errorEmail ? <Error errorMessages={errorEmail} /> : null}
      <FormCategory name="password" type="password" />
      <FormCategory name="passwordConfirmation" type="password" />
      {errorPassword ? <Error errorMessages={errorPassword} /> : null}
      <FormCategory name="username" type="text" />
      {errorUsername ? <Error errorMessages={errorUsername} /> : null}
      <FormCategory name="currentWeight" type="number" />
      <FormCategory name="goalWeight" type="number" />
      <FormCategory name="height" type="number" />
      <FormCategory name="age" type="number" />
      <FormCategory
        optionsName="gender-choices"
        name="gender"
        options={["-----", "Male", "Female", "Prefer not to disclose"]}
      />
      <FormCategory
        onChange={addToOptionsList}
        optionsName="dietary-choices"
        name="dietaryRestrictions"
        options={currentDietaryRestrictions}
        size={true}
        value={currentOptionsValue}
      />
      <Button name="Submit" />
    </form>
  );
}
