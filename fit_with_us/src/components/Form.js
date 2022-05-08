import React from "react";
//import FormCategory from "./FormCategory";
//import Button from "./Button";

export default function Form(props) {
  // function handleSubmit(e) {
  //   e.preventDefault();
  // }

  return (
    <div class="column is-two-thirds">
    <form action="http://localhost:8080/api/user" method="POST">
      <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input is-danger" type="email" placeholder="Email" value="hello@"/>
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
            <p class="help is-danger">This email is invalid</p>
          </div>
          <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input is-success" type="text" placeholder="Username" value="bulma"/>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
            <p class="help is-success">This username is available</p>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input is-danger" type="password" placeholder="Password" value="bulma"/>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
            <p class="help is-danger">Your password must be at least eight characters long</p>
          </div>
          <div class="field">
            <label class="label">Re-enter your password</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input is-danger" type="password" placeholder="Password" value="bulma"/>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </div>
            <p class="help is-danger">Your password must be at least eight characters long</p>
          </div>
          <div class="field">
            <label class="label">Gender</label>
            <div class="select">
              <select>
                <option>Male</option>
                <option>Female</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label class="label">Dietary Restrictions</label>
            <div class="control">
              <div class="select">
                <select>
                  <option>Vegetarian</option>
                  <option>Vegan</option>
                  <option>Dairy-free</option>
                  <option>Gluten-free</option>
                  <option>Low FODMAP</option>
                </select>
              </div>
            </div>
          </div>
          <label class="label">Current weight</label>
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="number" placeholder="Enter your current weight"/>
            </p>
            <p class="control">
                <span class="select">
                  <select>
                    <option>lbs</option>
                    <option>kgs</option>
                  </select>
                </span>
              </p>
          </div>
          <label class="label">Goal weight</label>
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="number" placeholder="Enter your desired weight"/>
            </p>
            <p class="control">
                <span class="select">
                  <select>
                    <option>lbs</option>
                    <option>kgs</option>
                  </select>
                </span>
              </p>
          </div>
          <label class="label">Height</label>
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="number" placeholder="Enter your height"/>
            </p>
            <p class="control">
                <span class="select">
                  <select>
                    <option>in.</option>
                    <option>cms</option>
                  </select>
                </span>
              </p>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
            <div class="control">
              <button class="button is-link is-light">Cancel</button>
            </div>
          </div>
      </form>
      </div>
  );
}
