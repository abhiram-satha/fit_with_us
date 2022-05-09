import "./App.css";
// import Form from "./Form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies, Cookies, withCookies } from "react-cookie";
import UserLogin from "./UserLogin";
import SignUp from "./SignUp";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import Button from "./Button";

function App() {
const user_id = localStorage.getItem('user');

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
      <BottomNav />
 
      {/* {!user_id ? <Form /> :<BottomNav/>}
      
      {loggedIn ? (
        <>
          <TopNav loggedOutUser={loggedOutUser} />
          <br />
          <br />
          <BottomNav />
        </>
      ) : login ? (
        <>
          <TopNav backButton={backButton} />
          <UserLogin
            loggedInUser={loggedInUser}
            setSignUp={setSignUp}
            signUserUp={signUserUp}
          />
        </>
      ) : signUp ? (
        <>
          <TopNav backButton={backButton} />
          <SignUp loggedInUser={loggedInUser} />
        </>
      ) : (
        <>
          <h1>Welcome to Fit with Us!</h1>
          <Button onClick={loginUser} name="Login" />
          <Button onClick={signUserUp} name="Sign Up!" />
        </>
      )} */}
    </div>
  );
}

export default App;
