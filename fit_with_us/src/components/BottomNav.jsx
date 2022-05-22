import React from "react";
import { useState } from "react";


export default function BottomNav(props) {

  const activeURLArray = window.location.href.split("/");
  const activeRoute = activeURLArray[activeURLArray.length - 1];

  const [youClass, setYouClass] = useState(
    ["homepage", "settings", "profile", "weightchart", "recipe-details", "food-restrictions", "settings?"].includes(activeRoute) ? "is-active" : ""
  );
  const [usClass, setUsClass] = useState(
    activeRoute === "posts" ? "is-active" : ""
  );

  const handleYouClick = () => {
    setUsClass("");
    setYouClass("is-active");
  };

  const handleUsClick = () => {
    setYouClass("");
    setUsClass("is-active");
  };

  return (
    <div class="navbar tabs is-toggle is-centered is-medium is-fullwidth is-fixed-bottom mb-0">
      <ul>
        <li class={youClass} onClick={handleYouClick} id="you">
          {/* <Link to="/homepage">You</Link> */}
          <a href="/homepage">You</a>
        </li>
        <li class={usClass} onClick={handleUsClick} id="us">
          {/* <Link to="/posts">Us</Link> */}
          <a href="/posts">Us</a>
        </li>
      </ul>
    </div>
  );
}
