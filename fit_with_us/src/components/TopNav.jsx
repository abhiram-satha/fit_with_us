import Button from "./Button";

export default function TopNav(props) {
  return (
    <>
      TopNav
      <Button onClick={props.loggedOutUser} name="Log out" />
    </>
  );
}
