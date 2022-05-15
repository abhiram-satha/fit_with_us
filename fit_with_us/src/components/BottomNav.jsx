import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Posts from "./Posts";
import axios from "axios";
import RecipeDetails from "./RecipeDetails";
import { useState, useEffect } from "react";
import { useAlert } from "react-alert";

export default function BottomNav(props) {
  console.log(props.usClass)

  return (
    <div class="navbar tabs is-toggle is-centered is-medium is-fullwidth is-fixed-bottom mb-0">
    <ul>
      <li class={props.youClass} id="you">
        {/* <Link to="/homepage">You</Link> */}
        <a href="/homepage">You</a>
      </li>
      <li class={props.usClass} id="us">
        {/* <Link to="/posts">Us</Link> */}
        <a href="/posts">Us</a>
      </li>
    </ul>
  </div> 
  );
}
