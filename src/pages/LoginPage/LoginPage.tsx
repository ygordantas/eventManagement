import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import classes from "./LoginPage.module.css";

type LoginPageProps = {
  onRegisterClick: () => void;
};

export default function LoginPage({ onRegisterClick }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`email: ${email}\npassword: ${password}`);
  };

  return (
    <section className={classes.section}>
      <div className={classes.form_container}>
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
          <Button type="submit" className={classes.center_btn}>
            Login
          </Button>
        </form>
        <div className={classes.register}>
          <p>New around here?</p>{" "}
          <Button onClick={() => onRegisterClick()}>Register</Button>
        </div>
      </div>
    </section>
  );
}
