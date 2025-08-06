import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import classes from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import useAlertContext from "../../hooks/useAlertContext";

export default function LoginPage() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { showErrorAlert } = useAlertContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      login(email, password);
      navigate("/");
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : JSON.stringify(e);
      showErrorAlert(errorMessage);
    }
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
