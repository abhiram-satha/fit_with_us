import React from "react";

export default function BottomNav(props) {

  return (
    <div class="navbar tabs is-toggle is-centered is-medium is-fullwidth is-fixed-bottom mb-0">
    <ul>
      <li class={window.location.href === "http://localhost:3003/posts" ? "" : "is-active"} id="you">
        {/* <Link to="/homepage">You</Link> */}
        <a href="/homepage">You</a>
      </li>
      <li class={window.location.href === "http://localhost:3003/posts" ? "is-active" : ""} id="us">
        {/* <Link to="/posts">Us</Link> */}
        <a href="/posts">Us</a>
      </li>
    </ul>
  </div> 
  );
}
