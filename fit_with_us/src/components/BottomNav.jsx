import React from "react";
import { useState } from "react";

export default function BottomNav(props) {
  const [youClass, setYouClass] = useState(
    window.location.href === "http://localhost:3002/homepage" ? "is-active" : ""
  );
  const [usClass, setUsClass] = useState(
    window.location.href === "http://localhost:3002/posts" ? "is-active" : ""
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
    <div className="navbar tabs is-toggle is-centered is-medium is-fullwidth is-fixed-bottom mb-0">
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
