import { useRef, useState } from "react";
import createClassName from "../../utils/createClassName";
import classes from "./Input.module.css";

type InputProps = {
  label: string;
} & React.ComponentPropsWithoutRef<"input">;

export default function Input({ label, ...props }: InputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { className, onBlur, placeholder, id, name, ...remainingProps } = props;

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onBlur?.(e);

    const input = ref.current;

    if (!input) return;

    setErrorMessage(input.checkValidity() ? "" : input.validationMessage);
  };

  return (
    <div className={createClassName(className, classes.input_container)}>
      <input
        ref={ref}
        id={id ?? label}
        name={name ?? label}
        onBlur={onBlurHandler}
        placeholder={placeholder ? " " : " "}
        className={createClassName(
          classes.input,
          errorMessage && classes.has_error
        )}
        {...remainingProps}
      />
      <label htmlFor={id ?? label}>
        {label} {remainingProps.required && "*"}
      </label>
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
}
