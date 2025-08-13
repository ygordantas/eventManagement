import { useRef, useState } from "react";
import createClassName from "../../utils/createClassName";
import classes from "./Textarea.module.css";

type TextareaProps = {
  label: string;
} & React.ComponentPropsWithoutRef<"textarea">;

export default function Textarea({ label, ...props }: TextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { className, onBlur, placeholder, id, name, ...remainingProps } = props;

  const onBlurHandler = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    onBlur?.(e);

    const input = ref.current;

    if (!input) return;

    setErrorMessage(input.checkValidity() ? "" : input.validationMessage);
  };

  return (
    <div className={createClassName(className, classes.textarea_container)}>
      <textarea
        ref={ref}
        id={id ?? label}
        name={name ?? label}
        onBlur={onBlurHandler}
        placeholder={placeholder ? " " : " "}
        className={createClassName(
          classes.textarea,
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
