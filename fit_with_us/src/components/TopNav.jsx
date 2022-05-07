import Button from "./Button";

export default function TopNav(props) {
  return (
    <>
      <Button onClick={props.loggedOutUser} name="Log out" />
    </>
  );
}
