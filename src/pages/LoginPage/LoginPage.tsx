import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import useAlertContext from "../../hooks/useAlertContext";
import useAuthContext from "../../hooks/useAuthContext";
import classes from "./LoginPage.module.css";

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
    } catch (error) {
      showErrorAlert(error instanceof Error ? error : String(error));
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <Input value={email} required onChange={(e) => setEmail(e.target.value)} label='Email' type='email' />
        <Input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label='Password'
          type='password'
        />
        <Button align='center' type='submit'>
          Login
        </Button>
      </form>
      <div className={classes.register}>
        <p>New around here?</p>
        <Button as={Link} to='/register'>
          Register
        </Button>
      </div>
    </>
  );
}
