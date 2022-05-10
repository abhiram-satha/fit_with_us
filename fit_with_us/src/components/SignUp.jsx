import React, { useState, useEffect } from "react";
import FormCategory from "./FormCategory";
import Button from "./Button";
import axios from "axios";
import Error from "./Error";
import Loading from "./Loading";

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
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userUsername, setUserUsername] = useState("");

  useEffect(() => {
    // const userInformation = getUserInformation();
    // if (!errorEmail && !errorUsername && !errorPassword) {
    //   console.log("Information can be used");
    // } else {
    //   console.log("Something is wrong");
    // }
  }, []);

  //Variables
  const gender = [];
  const dietaryRestrictions = [];

  //Helper Functions
  const checkEqualPasswords = (password, passwordConfirmation) => {
    if (password === passwordConfirmation) {
      return true;
    }
    return false;
  };

  const getUserInformation = async () => {
    return await axios.get("http://localhost:8080/api/allUsers");
  };

  const checkForInformation = (usersDatabase, value, userColumn) => {
    for (const user of usersDatabase) {
      if (user[userColumn] === value) {
        return true;
      }
    }
    return false;
  };

  // const checkEmail = async (params) => {
  //   return await axios.get("http://localhost:8080/api/usernameCheck", {
  //     params,
  //   });
  // };

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

  const submitUserInformation = async (e) => {
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

    await getUserInformation().then((response) => {
      const userDatabase = response.data.users;
      console.log(userDatabase);
      const emailExists = checkForInformation(userDatabase, email, "email");
      const usernameExists = checkForInformation(
        userDatabase,
        username,
        "username"
      );
      const equalPasswords = checkEqualPasswords(
        password,
        passwordConfirmation
      );

      console.log("Values", emailExists, usernameExists, equalPasswords);

      if (emailExists) {
        setErrorEmail("The email exists");
      }

      if (usernameExists) {
        setErrorUsername("The username exists");
      }

      if (!equalPasswords) {
        setErrorPassword("The passwords do not match");
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
    <>
      <p>
        {userEmail}
        {userPassword}
        {userUsername}
      </p>

      {userEmail && userPassword && userUsername ? (
        <Loading message="Signing In" />
      ) : (
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
      )}
    </>
  );
}
