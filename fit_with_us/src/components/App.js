import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies, Cookies, withCookies } from "react-cookie";
import UserLogin from "./UserLogin";
import SignUp from "./SignUp";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

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
  const [signUp, setSignUp] = useState(false);

  //Set Cookies
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    const userID = cookies.id;
    if (userID) {
      setLoggedIn(true);
    }
  }, []);

  function loggedInUser(id) {
    setCookie("id", id, { path: "/" });
  }

  function loggedOutUser() {
    removeCookie("id", { path: "/" });
    setLoggedIn(false);
  }

  return (
    <div className="App">
      {loggedIn ? (
        <>
          {signUp ? (
            <SignUp setLoggedIn={setLoggedIn} setSignUp={setSignUp} />
          ) : (
            <div></div>
          )}
          <TopNav loggedOutUser={loggedOutUser} />
          <br />
          <br />
          <BottomNav />
        </>
      ) : (
        <UserLogin
          setLoggedIn={setLoggedIn}
          setSignUp={setSignUp}
          loggedInUser={loggedInUser}
        />
      )}
    </div>
  );
}

export default App;
