import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies, Cookies, withCookies } from "react-cookie";
import UserLogin from "./UserLogin";
import SignUp from "./SignUp";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import Button from "./Button";

function App() {
  // const [calories, setCalories] = useState();

  // useEffect(() => {
  //   Promise.all([axios.get("http://localhost:8080/")])
  //     .then((all) => {
  //       const calories = all[0].data["hits"][0]["recipe"]["calories"];
  //       const quantityYield = all[0].data["hits"][0]["recipe"]["yield"];
  //       setCalories([calories / quantityYield]);
  //     })
  //     .catch((err) => console.log(err.message));
  // }, []);

  //User States
  const [loggedIn, setLoggedIn] = useState(false);
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);

  //Set Cookies
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    const userID = cookies.id;
    if (userID) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  function loggedInUser(id) {
    setCookie("id", id, { path: "/" });
    setLoggedIn(true);
  }

  function backButton() {
    setLoggedIn(false);
    setLogin(false);
    setSignUp(false);
  }

  function loggedOutUser() {
    removeCookie("id", { path: "/" });
    backButton();
  }

  function loginUser() {
    setLogin(true);
  }

  function signUserUp() {
    setSignUp(true);
  }

  return (
    <div className="App">
      {/* {!user_id ? <Form /> :<BottomNav/>} */}

      {loggedIn ? (
        <>
          <TopNav loggedOutUser={loggedOutUser} />
          <BottomNav />
        </>
      ) : login ? (
        <>
          <UserLogin
            loggedInUser={loggedInUser}
            setSignUp={setSignUp}
            signUserUp={signUserUp}
          />
        </>
      ) : signUp ? (
        <>
          <SignUp loggedInUser={loggedInUser} />
        </>
      ) : (
        <>
          <h1>Welcome to Fit with Us!</h1>
          <Button onClick={loginUser} name="Login" />
          <Button onClick={signUserUp} name="Sign Up!" />
        </>
      )}
    </div>
  );
}

export default App;
