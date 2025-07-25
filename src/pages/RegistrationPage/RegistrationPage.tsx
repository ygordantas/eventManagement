import { useMemo, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import classes from "./RegistrationPage.module.css";

type RegistrationFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: Date;
};

type RegistrationPageProps = {
  onLoginClick: () => void;
};

export default function RegistrationPage({
  onLoginClick,
}: RegistrationPageProps) {
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(formData));
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
    <section className={classes.section}>
      <div className={classes.form_container}>
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
          {!doPasswordMatch && formData.confirmPassword.length > 0 && (
            <p>Passwords do not match!</p>
          )}
          <Button className={classes.center_btn} type="submit">
            Create
          </Button>
        </form>
        <div className={classes.login}>
          <p>Already have an account?</p>
          <Button onClick={() => onLoginClick()}>Go to login</Button>
        </div>
      </div>
    </section>
  );
}
