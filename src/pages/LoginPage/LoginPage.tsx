import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import classes from "./LoginPage.module.css";
import { Link } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`email: ${email}\npassword: ${password}`);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <Input
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          type="email"
        />
        <Input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
        />
        <Button align="center" type="submit" className={classes.center_btn}>
          Login
        </Button>
      </form>
      <div className={classes.footer}>
        <p>New around here?</p>
        <Button as={Link} to="/register">
          Register
        </Button>
      </div>
    </>
  );
}
