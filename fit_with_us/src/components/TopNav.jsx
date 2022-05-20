import React, { useState } from "react";
import Button from "./Button";
import "../helpers/navbarQuery";
import { Link, Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";

export default function TopNav(props) {
  const [burgerClass, setBurgerClass] = useState("navbar-burger");
  const [menuClass, setMenuClass] = useState("navbar-menu");
  const handleBurger = () => {
    if (burgerClass === "navbar-burger") {
      setBurgerClass("navbar-burger is-active");
      setMenuClass("navbar-menu is-active");
    } else {
      setBurgerClass("navbar-burger");
      setMenuClass("navbar-menu");
    }
  };
  return (
    <>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="https://i.imgur.com/cBZaCDn.png" />
          </a>

          <button
            onClick={handleBurger}
            role="button"
            class={burgerClass}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div id="navbarBasicExample" class={menuClass}>
          <div class="navbar-start">
            <a class="navbar-item">
              <Link to="/profile">Profile</Link>
            </a>

            <a class="navbar-item">Messages</a>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">Update your journey</a>

              <div class="navbar-dropdown">
                <a class="navbar-item">Update current weight</a>
                <a class="navbar-item">Change recipe</a>
              </div>
            </div>
            <a href="/settings" class="navbar-item">
              Settings
            </a>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                {props.backButton ? (
                  <Button
                    onClick={props.backButton}
                    className="back"
                    name="Back"
                  />
                ) : null}
                {props.loggedOutUser ? (
                  <Button onClick={props.loggedOutUser} name="Log out" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
