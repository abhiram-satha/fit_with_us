import Button from "./Button";

export default function TopNav(props) {
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://google.ca">
            Fit With Us Logo
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">Profile</a>

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
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {props.backButton ? (
        <Button onClick={props.backButton} class="back" name="Back" />
      ) : null}
      {props.loggedOutUser ? (
        <Button onClick={props.loggedOutUser} name="Log out" />
      ) : null}
    </>
  );
}
