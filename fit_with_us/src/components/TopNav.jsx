import React from "react";
import Button from "./Button";
import "../helpers/navbarQuery"

export default function TopNav(props) {
  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
    </a>
      
          <button role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">
              Profile
            </a>
      
            <a class="navbar-item">
              Messages
            </a>
      
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                Update your journey
              </a>
      
              <div class="navbar-dropdown">
                <a class="navbar-item">
                  Update current weight
                </a>
                <a class="navbar-item">
                  Change recipe 
                </a>
              </div>
            </div>
            <a class="navbar-item">
                Settings
              </a>
          </div>
      
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                {props.backButton ? (<Button onClick={props.backButton} className="back" name="Back" />) : null}
                {props.loggedOutUser ? (<Button onClick={props.loggedOutUser} name="Log out" />) : null}
              </div>
            </div>
          </div>
        </div>
      </nav>

  );
}