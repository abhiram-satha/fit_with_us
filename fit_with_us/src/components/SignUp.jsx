import React, { useState, useEffect } from "react";
import FormCategory from "./FormCategory";
import Button from "./Button";
import axios from "axios";
import Error from "./Error";
import { checkEmptyInput } from "../helpers/signUpHelpers";
import "../styles/SignUp.scss";
import { useNavigate } from "react-router-dom";

export default function Form(props) {
  //Error States
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorCurrentWeight, setErrorCurrentWeight] = useState(false);
  const [errorGoalWeight, setErrorGoalWeight] = useState(false);
  const [errorHeight, setErrorHeight] = useState(false);
  const [errorAge, setErrorAge] = useState(false);

  //Input classes setters
  const [emailClass, setEmailClass] = useState("input");
  const [passwordClass, setPasswordClass] = useState("input");
  const [passwordConfirmationClass, setPasswordConfirmationClass] =
    useState("input");
  const [usernameClass, setUsernameClass] = useState("input");
  const [currentWeightClass, setCurrentWeightClass] = useState("input");
  const [goalWeightClass, setGoalWeightClass] = useState("input");
  const [heightClass, setHeightClass] = useState("input");
  const [ageClass, setAgeClass] = useState("input");

  const navigate = useNavigate();

  useEffect(() => {}, []);

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

  const submitUserInformation = async (e) => {
    //Reset States
    setErrorEmail(false);
    setErrorUsername(false);
    setErrorPassword(false);
    setErrorCurrentWeight(false);
    setErrorGoalWeight(false);
    setErrorHeight(false);
    setErrorAge(false);
    setEmailClass("input");
    setPasswordClass("input");
    setPasswordConfirmationClass("input");
    setUsernameClass("input");
    setCurrentWeightClass("input");
    setGoalWeightClass("input");
    setHeightClass("input");
    setAgeClass("input");

    e.preventDefault();
    console.log(e);
    const params = {
      email: e.target[0].value,
      password: e.target[2].value,
      username: e.target[1].value,
    };

    const email = e.target[0].value;
    const password = e.target[2].value;
    const passwordConfirmation = e.target[3].value;
    const username = e.target[1].value;
    const currentWeight = e.target[8].value;
    const goalWeight = e.target[10].value;
    const height = e.target[12].value;
    const age = e.target[4].value;
    const gender = e.target[7].value;
    const currentWeightUnit = e.target[9].value;
    const goalWeightUnit = e.target[11].value;
    const heightUnit = e.target[13].value;

    //Check empty Email input
    if (!checkEmptyInput(email)) {
      setErrorEmail("This field cannot be blank!");
      return setEmailClass("input is-danger");
    }

    //Check empty password input
    if (!checkEmptyInput(password)) {
      setErrorPassword("This field cannot be blank!");
      return setPasswordClass("input is-danger");
    }

    //Check empty password confirmation input
    if (!checkEmptyInput(passwordConfirmation)) {
      setErrorPassword("This field cannot be blank!");
      return setPasswordConfirmationClass("input is-danger");
    }

    //Check empty username input
    if (!checkEmptyInput(username)) {
      setErrorUsername("This field cannot be blank!");
      return setUsernameClass("input is-danger");
    }

    //Check empty current weight input
    if (!checkEmptyInput(currentWeight)) {
      setErrorCurrentWeight("This field cannot be blank!");
      return setCurrentWeightClass("input is-danger");
    }

    //Check empty goal weight input
    if (!checkEmptyInput(goalWeight)) {
      setErrorGoalWeight("This field cannot be blank!");
      return setGoalWeightClass("input is-danger");
    }

    //Check empty height input
    if (!checkEmptyInput(height)) {
      setErrorHeight("This field cannot be blank!");
      return setHeightClass("input is-danger");
    }

    //Check empty age input
    if (!checkEmptyInput(age)) {
      setErrorAge("Please enter a valid birth date");
      return setAgeClass("input is-danger");
    }

    await getUserInformation()
      .then(async (response) => {
        const userDatabase = response.data.users;
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

        if (emailExists) {
          setErrorEmail("The email exists");
          setEmailClass("input is-danger");
        }

        if (usernameExists) {
          setErrorUsername("The username exists");
          setUsernameClass("input is-danger");
        }

        if (!equalPasswords) {
          setErrorPassword("The passwords do not match");
          setPasswordClass("input is-danger");
          setPasswordConfirmationClass("input is-danger");
        }

        if (emailExists || usernameExists || !equalPasswords) {
          throw new Error("Information not correct");
        }
      })
      .then(async () => {
        //Makes entry into database
        Promise.all([
          axios.post("http://localhost:8080/api/users", {
            email,
            password,
            username,
            currentWeight,
            goalWeight,
            height,
            age,
            gender,
            currentWeightUnit,
            goalWeightUnit,
            heightUnit,
          }),
        ]);
      })
      .then(() => {
        setTimeout(() => {
          Promise.all([
            axios.get("http://localhost:8080/api/users", { params }),
            axios.get("http://localhost:8080/api/allUsers"),
          ]).then((all) => {
            //Returns user ID
            const userData = all[0].data.users;
            const user = userData[0];
            axios.post(`http://localhost:8080/api/weights`, {
              user_id: user.id,
              weight: currentWeight,
            });

            if (userData.length !== 0) {
              navigate("/food-restrictions");
              props.loggedInUser(user.id);
            }
          });
        }, 100);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div class="columns is-mobile is-centered">
      <div class="column is-four-fifths">
        <form
          onSubmit={submitUserInformation}
          action="http://localhost:8080/api/user"
          method="POST"
        >
          <div class="field">
            <label htmlFor="email" class="label">
              Email
            </label>
            <div class="control has-icons-left has-icons-right">
              <input
                class={emailClass}
                name="email"
                id="email"
                type="email"
                placeholder="Email"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
            <p class="help is-danger">{errorEmail}</p>
          </div>
          <div class="field">
            <label class="label" htmlFor="username">
              Username
            </label>
            <div class="control has-icons-left has-icons-right">
              <input
                class={usernameClass}
                name="username"
                id="username"
                type="text"
                placeholder="Username"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
            <p class="help is-danger">{errorUsername}</p>
          </div>
          <div class="field">
            <label htmlFor="password" class="label">
              Password
            </label>
            <div class="control has-icons-left has-icons-right">
              <input
                class={passwordClass}
                name="password"
                id="password"
                type="password"
                placeholder="Password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
            <p class="help is-danger">{errorPassword}</p>
          </div>
          <div class="field">
            <label htmlFor="passwordConfirmation" class="label">
              Re-enter your password
            </label>
            <div class="control has-icons-left has-icons-right">
              <input
                class={passwordConfirmationClass}
                name="passwordConfirmation"
                id="passwordConfirmation"
                type="password"
                placeholder="Password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
            <p class="help is-danger">{errorPassword}</p>
          </div>
          <label htmlFor="age" class="label">
            Birth date
          </label>
          <div class="field is-grouped">
            <div class="control">
              <input
                class={ageClass}
                name="age"
                id="age"
                type="number"
                maxlength="4"
                placeholder="YYYY"
              />
            </div>
            <div class="control">
              <input
                class={ageClass}
                id="month"
                type="number"
                maxlength="2"
                min="1"
                max="12"
                placeholder="MM"
              />
            </div>
            <div class="control">
              <input
                class={ageClass}
                id="day"
                type="number"
                maxlength="2"
                placeholder="DD"
                min="1"
                max="31"
              />
            </div>
          </div>
          <p class="help is-danger attaches-to-above-div">{errorAge}</p>
          <div class="field">
            <label htmlFor="gender" class="label">
              Gender
            </label>
            <div class="select">
              <select id="gender" name="gender">
                <option>Male</option>
                <option>Female</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>
          <label class="label" htmlFor="currentWeight">
            Current weight
          </label>
          <div class="field has-addons">
            <p class="control is-expanded">
              <input
                class={currentWeightClass}
                type="number"
                name="currentWeight"
                id="currentWeight"
                placeholder="Enter your current weight"
              />
            </p>
            <p class="control">
              <span class="select">
                <select>
                  <option>lbs</option>
                  <option>kgs</option>
                </select>
              </span>
            </p>
          </div>
          <p class="help is-danger attaches-to-above-div">
            {errorCurrentWeight}
          </p>
          <label htmlFor="goalWeight" class="label">
            Goal weight
          </label>
          <div class="field has-addons">
            <p class="control is-expanded">
              <input
                name="goalWeight"
                id="goalWeight"
                class={goalWeightClass}
                type="number"
                placeholder="Enter your desired weight"
              />
            </p>
            <p class="control">
              <span class="select">
                <select>
                  <option>lbs</option>
                  <option>kgs</option>
                </select>
              </span>
            </p>
          </div>
          <p class="help is-danger attaches-to-above-div">{errorGoalWeight}</p>
          <label htmlFor="height" class="label">
            Height
          </label>
          <div class="field has-addons">
            <p class="control is-expanded">
              <input
                class={heightClass}
                name="height"
                id="height"
                type="number"
                placeholder="Enter your height"
              />
            </p>
            <p class="control">
              <span class="select">
                <select>
                  <option>in.</option>
                  <option>cms</option>
                </select>
              </span>
            </p>
          </div>
          <p class="help is-danger attaches-to-above-div">{errorHeight}</p>
          <div class="field mt-5">
            <div class="control">
              <Button name="Submit" />
            </div>
          </div>
        </form>
        <br />
        <br />
        <a onClick={props.returnToLogin} class="is-pulled-right">
          Already have an account? Click here
        </a>
      </div>
    </div>

    // const email = e.target[0].value;
    // const password = e.target[2].value;
    // const passwordConfirmation = e.target[3].value;
    // const username = e.target[1].value;
    // const currentWeight = e.target[9].value;
    // const goalWeight = e.target[11].value;
    // const height = e.target[13].value;
    // const age = e.target[4].value;
    // const gender = e.target[7].value;
  );
}

// return (
//   <form
//     onSubmit={submitUserInformation}
//     action="http://localhost:8080/api/users"
//     method="POST"
//   >
//     <FormCategory name="email" type="email" class={emailClass} />
//     {errorEmail ? <Error errorMessage={errorEmail} /> : null}
//     <FormCategory name="password" type="password" class={passwordClass} />
//     <FormCategory
//       name="passwordConfirmation"
//       type="password"
//       class={passwordConfirmationClass}
//     />
//     {errorPassword ? <Error errorMessage={errorPassword} /> : null}
//     <FormCategory name="username" type="text" class={usernameClass} />
//     {errorUsername ? <Error errorMessage={errorUsername} /> : null}
//     <FormCategory
//       name="currentWeight"
//       type="number"
//       class={currentWeightClass}
//     />
//     {errorCurrentWeight ? <Error errorMessage={errorCurrentWeight} /> : null}
//     <FormCategory name="goalWeight" type="number" class={goalWeightClass} />
//     {errorGoalWeight ? <Error errorMessage={errorGoalWeight} /> : null}
//     <FormCategory name="height" type="number" class={heightClass} />
//     {errorHeight ? <Error errorMessage={errorHeight} /> : null}
//     <FormCategory name="age" type="number" class={ageClass} />
//     {errorAge ? <Error errorMessage={errorAge} /> : null}
//     <FormCategory
//       optionsName="gender-choices"
//       name="gender"
//       options={["-----", "Male", "Female", "Prefer not to disclose"]}
//     />
//     <Button name="Submit" />
//   </form>
// );
//}
