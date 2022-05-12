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

    await getUserInformation()
      .then(async (response) => {
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

        if (emailExists || usernameExists || !equalPasswords) {
          throw new Error("Information not correct");
        }
      })
      .then(async (all) => {
        //Makes entry into database
        Promise.all([
          axios.post("http://localhost:8080/api/user", {
            email,
            password,
            username,
            currentWeight,
            goalWeight,
            height,
            age,
          }),
        ]).then((all) => {
          console.log(all);
        });
      })
      .then((all) => {
        setTimeout(() => {
          Promise.all([
            axios.get("http://localhost:8080/api/user", { params }),
            axios.get("http://localhost:8080/api/allUsers"),
          ]).then((all) => {
            //Returns user ID
            const userData = all[0].data.users;
            const user = userData[0];
            const test = all[1].data;
            console.log(test);
            if (userData.length !== 0) {
              props.loggedInUser(user.id);
            }
          });
        }, 100);
      })
      .catch((err) => console.log(err));
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

{
  /* <div class="column is-two-thirds">
//     {/* <form onSubmit={submitUserInformation} action="http://localhost:8080/api/user" method="POST"> */
}
//     <form action="http://localhost:8080/api/user" method="POST">
//       <div class="field">
//             <label htmlFor="email" class="label">Email</label>
//             <div class="control has-icons-left has-icons-right">
//               <input class="input is-danger" name="email" id="email" type="email" placeholder="Email"/>
//               <span class="icon is-small is-left">
//                 <i class="fas fa-envelope"></i>
//               </span>
//               <span class="icon is-small is-right">
//                 <i class="fas fa-exclamation-triangle"></i>
//               </span>
//             </div>
//             <p class="help is-danger">This email is invalid</p>
//           </div>
//           <div class="field">
//             <label class="label" htmlFor="username">Username</label>
//             <div class="control has-icons-left has-icons-right">
//               <input class="input is-success" name="username" id="username" type="text" placeholder="Username"/>
//               <span class="icon is-small is-left">
//                 <i class="fas fa-user"></i>
//               </span>
//               <span class="icon is-small is-right">
//                 <i class="fas fa-check"></i>
//               </span>
//             </div>
//             <p class="help is-success">This username is available</p>
//           </div>
//           <div class="field">
//             <label htmlFor="password" class="label">Password</label>
//             <div class="control has-icons-left has-icons-right">
//               <input class="input is-danger" name="password" id="password" type="password" placeholder="Password"/>
//               <span class="icon is-small is-left">
//                 <i class="fas fa-user"></i>
//               </span>
//               <span class="icon is-small is-right">
//                 <i class="fas fa-check"></i>
//               </span>
//             </div>
//             <p class="help is-danger">Your password must be at least eight characters long</p>
//           </div>
//           <div class="field">
//             <label htmlFor="passwordConfirmation" class="label">Re-enter your password</label>
//             <div class="control has-icons-left has-icons-right">
//               <input class="input is-danger" name="passwordConfirmation" id="passwordConfirmation" type="password" placeholder="Password"/>
//               <span class="icon is-small is-left">
//                 <i class="fas fa-user"></i>
//               </span>
//               <span class="icon is-small is-right">
//                 <i class="fas fa-check"></i>
//               </span>
//             </div>
//             <p class="help is-danger">Your password must be at least eight characters long</p>
//           </div>
//           <label htmlFor="age" class="label">Age</label>
//           <div class="field is-grouped">
//             <div class="control">
//               <input class="input" name="age" id="age" type="number" maxlength="4" placeholder="YYYY"/>
//             </div>
//             <div class="control">
//               <input class="input" id="month" type="number" maxlength="2" placeholder="MM"/>
//             </div>
//             <div class="control">
//               <input class="input" id="day" type="number" maxlength="2" placeholder="DD"/>
//             </div>
//           </div>
//           <div class="field">
//             <label htmlFor= "gender" class="label">Gender</label>
//             <div class="select">
//               <select id="gender" name="gender">
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Prefer not to say</option>
//               </select>
//             </div>
//           </div>
//           <div class="field">
//             <label htmlFor="dietaryRestrictions" class="label">Dietary Restrictions</label>
//             <div class="control">
//               <div class="select">
//                 <select id="dietaryRestrictions" name="dietaryRestrictions">
//                   <option>Vegetarian</option>
//                   <option>Vegan</option>
//                   <option>Dairy-free</option>
//                   <option>Gluten-free</option>
//                   <option>Low FODMAP</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//           <label class="label" htmlFor="currentWeight">Current weight</label>
//           <div class="field has-addons">
//             <p class="control is-expanded">
//               <input class="input" type="number" name="currentWeight" id="currentWeight" placeholder="Enter your current weight"/>
//             </p>
//             <p class="control">
//                 <span class="select">
//                   <select>
//                     <option>lbs</option>
//                     <option>kgs</option>
//                   </select>
//                 </span>
//               </p>
//           </div>
//           <label htmlFor="goalWeight" class="label">Goal weight</label>
//           <div class="field has-addons">
//             <p class="control is-expanded">
//               <input name="goalWeight" id="goalWeight" class="input" type="number" placeholder="Enter your desired weight"/>
//             </p>
//             <p class="control">
//                 <span class="select">
//                   <select>
//                     <option>lbs</option>
//                     <option>kgs</option>
//                   </select>
//                 </span>
//               </p>
//           </div>
//           <label htmlFor="height" class="label">Height</label>
//           <div class="field has-addons">
//             <p class="control is-expanded">
//               <input class="input" name="height" id="height" type="number" placeholder="Enter your height"/>
//             </p>
//             <p class="control">
//                 <span class="select">
//                   <select>
//                     <option>in.</option>
//                     <option>cms</option>
//                   </select>
//                 </span>
//               </p>
//           </div>
//           <div class="field is-grouped">
//             <div class="control">
//               <button class="button is-link">Submit</button>
//             </div>
//             <div class="control">
//               <button class="button is-link is-light">Cancel</button>
//             </div>
//           </div>
//       </form>
//       </div> */}

// //Variables
// const currentDietaryRestrictions = [
//   "None",
//   "No Eggs",
//   "Vegetarian",
//   "No Dairy",
// ];

// //States
// const [errorEmail, setErrorEmail] = useState(false);
// const [errorUsername, setErrorUsername] = useState(false);
// const [errorPassword, setErrorPassword] = useState(false);
// const [currentOptionsValue, setCurrentOptionsValues] = useState(["None"]);

// useEffect(() => {}, []);

// //Variables
// const gender = [];
// const dietaryRestrictions = [];

// //Helper Functions
// const checkEqualPasswords = (password, passwordConfirmation) => {
//   if (password === passwordConfirmation) {
//     return true;
//   }
//   return false;
// };

// const getUserInformation = async () => {
//   return await axios.get("http://localhost:8080/api/allUsers");
// };

// const checkForInformation = (usersDatabase, value, userColumn) => {
//   for (const user of usersDatabase) {
//     if (user[userColumn] === value) {
//       return true;
//     }
//   }
//   return false;
// };

//   useEffect(() => {}, []);

//   //Variables
//   const gender = [];
//   const dietaryRestrictions = [];

//   //Helper Functions
//   const checkEqualPasswords = (password, passwordConfirmation) => {
//     if (password !== passwordConfirmation) {
//       return true;
//     }
//     return false;
//   };

//   const checkEmail = (params) => {
//     new Promise((resolve, reject) => {
//       resolve(axios.get("http://localhost:8080/api/usernameCheck", { params }));
//     });
//   };

//   function addToOptionsList(e) {
//     const numberOfOptions = currentDietaryRestrictions
//       ? currentDietaryRestrictions.length
//       : 0;
//     const selectedList = [];

//     for (let i = 0; i < numberOfOptions; i++) {
//       if (e.target[i].selected) {
//         selectedList.push(e.target[i].value);
//       }
//     }
//     setCurrentOptionsValues(selectedList);
//   }

//   const submitUserInformation = (e) => {
//     //Reset States
//     setErrorEmail(false);
//     setErrorUsername(false);
//     setErrorPassword(false);

//     e.preventDefault();
//     const params = {
//       email: e.target[0].value,
//       password: e.target[1].value,
//       username: e.target[3].value,
//     };

//     const email = e.target[0].value;
//     const password = e.target[1].value;
//     const passwordConfirmation = e.target[2].value;
//     const username = e.target[3].value;
//     const currentWeight = e.target[4].value;
//     const goalWeight = e.target[5].value;
//     const height = e.target[6].value;
//     const age = e.target[7].value;
//     const gender = e.target[8].value;
//     const dietaryRestrictions = currentOptionsValue;

//     if (checkEqualPasswords(password, passwordConfirmation)) {
//       return setErrorPassword("The passwords do not match");
//     }

//     //Check Username
//     Promise.all([
//       axios.get("http://localhost:8080/api/usernameCheck", { params }),
//     ])
//       .then((all) => {
//         const userData = all[0].data.users;
//         if (userData.length !== 0) {
//           throw setErrorUsername("The username already exists");
//         }
//       })
//       .then((all) => {
//         //Check Email
//         Promise.all([
//           axios.get("http://localhost:8080/api/emailCheck", { params }),
//         ]).then((all) => {
//           const userData = all[0].data.users;
//           if (userData.length !== 0) {
//             throw setErrorEmail("The email already exists");
//           }
//         });
//       })
//       .then(async (all) => {
//         //Makes entry into database
//         await axios.post("http://localhost:8080/api/user", {
//           email,
//           password,
//           username,
//           currentWeight,
//           goalWeight,
//           height,
//           age,
//           gender,
//           dietaryRestrictions,
//         });

//         const response = await axios.get("http://localhost:8080/api/user", {
//           params,
//         });
//         //Returns user ID
//         const userData = response[0].data.users;
//         const user = userData[0];
//         if (
//           userData.length !== 0 &&
//           !errorEmail &&
//           !errorUsername &&
//           !errorPassword
//         ) {
//           props.loggedInUser(user.id);
//         }
//       })
//       // .then((all) => {
//       //   Promise.all([
//       //     axios.get("http://localhost:8080/api/user", { params }),
//       //   ]).then((all) => {
//       //     //Returns user ID
//       //     const userData = all[0].data.users;
//       //     const user = userData[0];
//       //     if (
//       //       userData.length !== 0 &&
//       //       !errorEmail &&
//       //       !errorUsername &&
//       //       !errorPassword
//       //     ) {
//       //       props.loggedInUser(user.id);
//       //     }
//       //   });
//       // })
//       .catch((err) => console.log(err.message));
//   };

//   // const validate = () => {

//   // }

//   return (
// <div class="column is-two-thirds">
//     {/* <form onSubmit={submitUserInformation} action="http://localhost:8080/api/user" method="POST"> */}
//     <form action="http://localhost:8080/api/user" method="POST">
//       <div class="field">
//             <label htmlFor="email" class="label">Email</label>
//             <div class="control has-icons-left has-icons-right">
//               <input class="input is-danger" name="email" id="email" type="email" placeholder="Email"/>
//               <span class="icon is-small is-left">
//                 <i class="fas fa-envelope"></i>
//               </span>
//               <span class="icon is-small is-right">
//                 <i class="fas fa-exclamation-triangle"></i>
//               </span>
//             </div>
//             <p class="help is-danger">This email is invalid</p>
//           </div>
//           <div class="field">
//             <label class="label" htmlFor="username">Username</label>
//             <div class="control has-icons-left has-icons-right">
//               <input class="input is-success" name="username" id="username" type="text" placeholder="Username"/>
//               <span class="icon is-small is-left">
//                 <i class="fas fa-user"></i>
//               </span>
//               <span class="icon is-small is-right">
//                 <i class="fas fa-check"></i>
//               </span>
//             </div>
//             <p class="help is-success">This username is available</p>
//           </div>
//           <div class="field">
//             <label htmlFor="password" class="label">Password</label>
//             <div class="control has-icons-left has-icons-right">
//               <input class="input is-danger" name="password" id="password" type="password" placeholder="Password"/>
//               <span class="icon is-small is-left">
//                 <i class="fas fa-user"></i>
//               </span>
//               <span class="icon is-small is-right">
//                 <i class="fas fa-check"></i>
//               </span>
//             </div>
//             <p class="help is-danger">Your password must be at least eight characters long</p>
//           </div>
//           <div class="field">
//             <label htmlFor="passwordConfirmation" class="label">Re-enter your password</label>
//             <div class="control has-icons-left has-icons-right">
//               <input class="input is-danger" name="passwordConfirmation" id="passwordConfirmation" type="password" placeholder="Password"/>
//               <span class="icon is-small is-left">
//                 <i class="fas fa-user"></i>
//               </span>
//               <span class="icon is-small is-right">
//                 <i class="fas fa-check"></i>
//               </span>
//             </div>
//             <p class="help is-danger">Your password must be at least eight characters long</p>
//           </div>
//           <label htmlFor="age" class="label">Age</label>
//           <div class="field is-grouped">
//             <div class="control">
//               <input class="input" name="age" id="age" type="number" maxlength="4" placeholder="YYYY"/>
//             </div>
//             <div class="control">
//               <input class="input" id="month" type="number" maxlength="2" placeholder="MM"/>
//             </div>
//             <div class="control">
//               <input class="input" id="day" type="number" maxlength="2" placeholder="DD"/>
//             </div>
//           </div>
//           <div class="field">
//             <label htmlFor= "gender" class="label">Gender</label>
//             <div class="select">
//               <select id="gender" name="gender">
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Prefer not to say</option>
//               </select>
//             </div>
//           </div>
//           <div class="field">
//             <label htmlFor="dietaryRestrictions" class="label">Dietary Restrictions</label>
//             <div class="control">
//               <div class="select">
//                 <select id="dietaryRestrictions" name="dietaryRestrictions">
//                   <option>Vegetarian</option>
//                   <option>Vegan</option>
//                   <option>Dairy-free</option>
//                   <option>Gluten-free</option>
//                   <option>Low FODMAP</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//           <label class="label" htmlFor="currentWeight">Current weight</label>
//           <div class="field has-addons">
//             <p class="control is-expanded">
//               <input class="input" type="number" name="currentWeight" id="currentWeight" placeholder="Enter your current weight"/>
//             </p>
//             <p class="control">
//                 <span class="select">
//                   <select>
//                     <option>lbs</option>
//                     <option>kgs</option>
//                   </select>
//                 </span>
//               </p>
//           </div>
//           <label htmlFor="goalWeight" class="label">Goal weight</label>
//           <div class="field has-addons">
//             <p class="control is-expanded">
//               <input name="goalWeight" id="goalWeight" class="input" type="number" placeholder="Enter your desired weight"/>
//             </p>
//             <p class="control">
//                 <span class="select">
//                   <select>
//                     <option>lbs</option>
//                     <option>kgs</option>
//                   </select>
//                 </span>
//               </p>
//           </div>
//           <label htmlFor="height" class="label">Height</label>
//           <div class="field has-addons">
//             <p class="control is-expanded">
//               <input class="input" name="height" id="height" type="number" placeholder="Enter your height"/>
//             </p>
//             <p class="control">
//                 <span class="select">
//                   <select>
//                     <option>in.</option>
//                     <option>cms</option>
//                   </select>
//                 </span>
//               </p>
//           </div>
//           <div class="field is-grouped">
//             <div class="control">
//               <button class="button is-link">Submit</button>
//             </div>
//             <div class="control">
//               <button class="button is-link is-light">Cancel</button>
//             </div>
//           </div>
//       </form>
//       </div>
//   );
