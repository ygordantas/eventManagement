import { useMemo, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import classes from "./RegistrationPage.module.css";
import { Link, useNavigate } from "react-router";
import createClassName from "../../utils/createClassName";
import useAuthContext from "../../hooks/useAuthContext";

type RegistrationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: Date;
};

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { register } = useAuthContext();

  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.confirmPassword !== formData.password) {
      alert("Passwords do not match!");
      return;
    }

    try {
      register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        dateOfBirth: formData.dateOfBirth!,
      });
      navigate("/");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : JSON.stringify(error);
      alert(message);
    }
  };

  const getMaxDate = useMemo(() => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split("T")[0];
  }, []);

  const doPasswordMatch = useMemo(
    () => formData.password === formData.confirmPassword,
    [formData.password, formData.confirmPassword]
  );

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <Input
          required
          label="First name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              firstName: e.target.value,
            }))
          }
        />
        <Input
          required
          label="Last name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              lastName: e.target.value,
            }))
          }
        />
        <Input
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          label="Email"
          type="email"
        />
        <Input
          required
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          label="Password"
          type="password"
        />
        <Input
          required
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          label="Confirm password"
          type="password"
        />

        <p
          className={createClassName(
            classes.psw_not_match,
            !doPasswordMatch &&
              formData.confirmPassword.length > 0 &&
              classes.show
          )}
        >
          Passwords do not match!
        </p>

        <Input
          required
          type="date"
          max={getMaxDate}
          label="Date of birth"
          value={
            formData.dateOfBirth
              ? formData.dateOfBirth.toISOString().split("T")[0]
              : ""
          }
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              dateOfBirth: new Date(e.target.value),
            }));
          }}
        />

        <Button disabled={!doPasswordMatch} align="center" type="submit">
          Create
        </Button>
      </form>
      <div className={classes.login}>
        <p>Already have an account?</p>
        <Button as={Link} to="/login">
          Go to login
        </Button>
      </div>
    </>
  );
}
