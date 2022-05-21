 <div class="column is-two-thirds">
     {/* <form onSubmit={submitUserInformation} action="http://localhost:8080/api/user" method="POST"> */
     <form action="http://localhost:8080/api/user" method="POST">
       <div class="field">
             <label htmlFor="email" class="label">Email</label>
             <div class="control has-icons-left has-icons-right">
               <input class="input is-danger" name="email" id="email" type="email" placeholder="Email"/>
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
             <label class="label" htmlFor="username">Username</label>
             <div class="control has-icons-left has-icons-right">
               <input class="input is-success" name="username" id="username" type="text" placeholder="Username"/>
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
             <label htmlFor="password" class="label">Password</label>
             <div class="control has-icons-left has-icons-right">
               <input class="input is-danger" name="password" id="password" type="password" placeholder="Password"/>
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
             <label htmlFor="passwordConfirmation" class="label">Re-enter your password</label>
             <div class="control has-icons-left has-icons-right">
               <input class="input is-danger" name="passwordConfirmation" id="passwordConfirmation" type="password" aceholder="Password"/>
               <span class="icon is-small is-left">
                 <i class="fas fa-user"></i>
               </span>
               <span class="icon is-small is-right">
                 <i class="fas fa-check"></i>
               </span>
             </div>
             <p class="help is-danger">Your password must be at least eight characters long</p>
           </div>
           <label htmlFor="age" class="label">Age</label>
           <div class="field is-grouped">
             <div class="control">
               <input class="input" name="age" id="age" type="number" maxlength="4" placeholder="YYYY"/>
             </div>
             <div class="control">
               <input class="input" id="month" type="number" maxlength="2" placeholder="MM"/>
             </div>
             <div class="control">
               <input class="input" id="day" type="number" maxlength="2" placeholder="DD"/>
             </div>
           </div>
           <div class="field">
             <label htmlFor= "gender" class="label">Gender</label>
             <div class="select">
               <select id="gender" name="gender">
                 <option>Male</option>
                 <option>Female</option>
                 <option>Prefer not to say</option>
               </select>
             </div>
           </div>
           <div class="field">
             <label htmlFor="dietaryRestrictions" class="label">Dietary Restrictions</label>
             <div class="control">
               <div class="select">
                 <select id="dietaryRestrictions" name="dietaryRestrictions">
                   <option>Vegetarian</option>
                   <option>Vegan</option>
                   <option>Dairy-free</option>
                   <option>Gluten-free</option>
                   <option>Low FODMAP</option>
                 </select>
               </div>
             </div>
           </div>
           <label class="label" htmlFor="currentWeight">Current weight</label>
           <div class="field has-addons">
             <p class="control is-expanded">
               <input class="input" type="number" name="currentWeight" id="currentWeight" placeholder="Enter your current ight"/>
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
           <label htmlFor="goalWeight" class="label">Goal weight</label>
           <div class="field has-addons">
             <p class="control is-expanded">
               <input name="goalWeight" id="goalWeight" class="input" type="number" placeholder="Enter your desired weight"/>
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
           <label htmlFor="height" class="label">Height</label>
           <div class="field has-addons">
             <p class="control is-expanded">
               <input class="input" name="height" id="height" type="number" placeholder="Enter your height"/>
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


        <div class="navbar tabs is-toggle is-centered is-medium is-fullwidth is-fixed-bottom mb-0">
          <ul>
            <li onClick={toggleYou} class={youToggle} id="you">
              <Link to="/homepage">You</Link>
            </li>
            <li onClick={toggleUs} class={usToggle} id="us">
              <Link to="/posts">Us</Link>
            </li>
          </ul>
        </div> 

          return (
    <div class="columns is-mobile is-centered">
      <div class="column is-four-fifths">
        <form onSubmit={submitUserInformation} action="http://localhost:8080/api/user" method="POST">
          <div class="field">
                <label htmlFor="email" class="label">Email</label>
                <div class="control has-icons-left has-icons-right">
                  <input class={emailClass} name="email" id="email" type="email" placeholder="Email"/>
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                {/* <p class="help is-danger">This email is invalid</p> */}
              </div>
              <div class="field">
                <label class="label" htmlFor="username">Username</label>
                <div class="control has-icons-left has-icons-right">
                  <input class={usernameClass} name="username" id="username" type="text" placeholder="Username"/>
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
                {/* <p class="help is-success">This username is available</p> */}
              </div>
              <div class="field">
                <label htmlFor="password" class="label">Password</label>
                <div class="control has-icons-left has-icons-right">
                  <input class={passwordClass} name="password" id="password" type="password" placeholder="Password"/>
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
                {/* <p class="help is-danger">Your password must be at least eight characters long</p> */}
              </div>
              <div class="field">
                <label htmlFor="passwordConfirmation" class="label">Re-enter your password</label>
                <div class="control has-icons-left has-icons-right">
                  <input class={passwordConfirmationClass} name="passwordConfirmation" id="passwordConfirmation" type="password" placeholder="Password"/>
                  <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </div>
                <p class="help is-danger">Your password must be at least eight characters long</p>
              </div>
              <label htmlFor="age" class="label">Birth date</label>
              <div class="field is-grouped">
                <div class="control">
                  <input class="input" name="age" id="age" type="number" maxlength="4" placeholder="YYYY"/>
                </div>
                <div class="control">
                  <input class="input" id="month" type="number" maxlength="2" placeholder="MM"/>
                </div>
                <div class="control">
                  <input class="input" id="day" type="number" maxlength="2" placeholder="DD"/>
                </div>
              </div>
              <div class="field">
                <label htmlFor= "gender" class="label">Gender</label>
                <div class="select">
                  <select id="gender" name="gender">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>
              <div class="field">
                <label htmlFor="dietaryRestrictions" class="label">Dietary Restrictions</label>
                <div class="control">
                  <div class="select">
                    <select id="dietaryRestrictions" name="dietaryRestrictions">
                      <option>Vegetarian</option>
                      <option>Vegan</option>
                      <option>Dairy-free</option>
                      <option>Gluten-free</option>
                      <option>Low FODMAP</option>
                    </select>
                  </div>
                </div>
              </div>
              <label class="label" htmlFor="currentWeight">Current weight</label>
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input class="input" type="number" name="currentWeight" id="currentWeight" placeholder="Enter your current weight"/>
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
              <label htmlFor="goalWeight" class="label">Goal weight</label>
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input name="goalWeight" id="goalWeight" class="input" type="number" placeholder="Enter your desired weight"/>
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
              <label htmlFor="height" class="label">Height</label>
              <div class="field has-addons">
                <p class="control is-expanded">
                  <input class="input" name="height" id="height" type="number" placeholder="Enter your height"/>
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
              <div class="field mt-5">
                <div class="control">
                  <Button name="Submit" />
                </div>
              </div>
          </form>
          <br />
          <br />
          <a onClick={props.returnToLogin} class="is-pulled-right">Don't have an account? Click here</a>
        </div>
      </div>

// const email = e.target[0].value;
// const password = e.target[2].value;
// const passwordConfirmation = e.target[3].value;
// const username = e.target[1].value;
// const currentWeight = e.target[9].value;
// const goalWeight = e.target[11].value;
// const height = e.target[13].value;
// const age = e.target[4].value;
// const gender = e.target[7].value;
    
  );
}