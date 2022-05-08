import Button from "./Button";

export default function TopNav(props) {
  return (
    <>
      {props.backButton ? (
        <Button onClick={props.backButton} class="back" name="Back" />
      ) : null}
      {props.loggedOutUser ? (
        <Button onClick={props.loggedOutUser} name="Log out" />
      ) : null}
    </>
  );
}
