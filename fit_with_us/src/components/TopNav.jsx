import React, { useState } from "react";
import Button from "./Button";
import "../helpers/navbarQuery";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import "../styles/TopNav.scss";

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
      <nav
        className="navbar"
        id="topnav"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link to="/homepage">
            <a className="navbar-item">
              {/* <img src="https://i.imgur.com/cBZaCDn.png" /> */}
              <img src="https://i.imgur.com/yCquLwJ.png" />
            </a>
          </Link>
          <button
            onClick={handleBurger}
            role="button"
            className={burgerClass}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div id="navbarBasicExample" className={menuClass}>
          <div className="navbar-start">
            <a href="/profile " className="navbar-item">
              Profile
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Update your journey</a>

              <div className="navbar-dropdown">
                <a href="/weightchart" className="navbar-item">
                  Update current weight
                </a>
                <a href="/recipe-details" className="navbar-item">
                  Change recipe
                </a>
              </div>
            </div>
            <a href="/settings" className="navbar-item">
              Settings
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
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
