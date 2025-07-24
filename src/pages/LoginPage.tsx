import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import classes from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <section className={classes.section}>
      <div className={classes.form_container}>
        <form action="">
          <Input type="email" label="Email" />
          <Input type="password" label="Password" />
          <Button className={classes.center_btn} type="submit">
            Login
          </Button>
        </form>
        <div>
          <p>New around here?</p> <Button>Register</Button>
        </div>
      </div>
    </section>
  );
}
