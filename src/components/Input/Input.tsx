import { useRef, useState } from "react";
import classes from "./Input.module.css";
import createClassName from "../../utils/createClassName";

type TextInputProps = {
  label?: string;
} & Omit<React.ComponentPropsWithRef<"input">, "placeholder">;

export default function Input({ label, ...props }: TextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [validationError, setValidationError] = useState("");
  const [touched, setTouched] = useState(false);

  const { className, onBlur, type, ...remainingProps } = props;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onBlur?.(e);

    const input = inputRef.current;
    if (!input) return;

    setValidationError(input.checkValidity() ? "" : input.validationMessage);
    setTouched(true);
  };

  const inputClassNames = [
    touched && validationError ? classes.hasError : "",
  ].join(" ");

  return (
    <div className={createClassName(className, classes.input_container)}>
      <input
        className={inputClassNames}
        type={type || "text"}
        ref={inputRef}
        placeholder=" "
        onBlur={handleBlur}
        {...remainingProps}
      />
      <label htmlFor={remainingProps.id} className={classes.label}>
        {label}
        {remainingProps.required && " *"}
      </label>
      {validationError && touched && (
        <span className={classes.error_message}>{validationError}</span>
      )}
    </div>
  );
}
