import React from "react";
import Button from "./Button";
import "../helpers/navbarQuery";
import { Link, Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";

export default function TopNav(props) {
  return (
    <>
      <Routes>
        <Route
          path={`/profile`}
          element={
            <UserProfile
              badges={props.badges}
              user={props.user}
              weight={props.weight}
            />
          }
        />
      </Routes>
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
          </a>

          <button
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              <Link to="/profile">Profile</Link>
            </a>

            <a className="navbar-item">Messages</a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Update your journey</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">Update current weight</a>
                <a className="navbar-item">Change recipe</a>
              </div>
            </div>
            <a className="navbar-item">Settings</a>
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
