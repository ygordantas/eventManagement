import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import classes from "./LoginPage.module.css";
import { Link } from "react-router";

type LoginPageProps = {
  onLogin: (email: string, password: string) => void;
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(email, password);
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
        <Button align="center" type="submit">
          Login
        </Button>
      </form>
      <div className={classes.register}>
        <p>New around here?</p>
        <Button as={Link} to="/register">
          Register
        </Button>
      </div>
    </>
  );
}
