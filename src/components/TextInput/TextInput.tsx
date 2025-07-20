import { useRef, useState } from "react";
import classes from "./TextInput.module.css";

type TextInputProps = {
  id?: string;
  label?: string;
  value?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  pattern?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput({
  pattern,
  id = "",
  label = "",
  value = "",
  className = "",
  required = false,
  disabled = false,
  onBlur = () => {},
  onChange = () => {},
}: TextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [validationError, setValidationError] = useState("");

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onBlur(e);

    const input = inputRef.current;
    if (!input) return;

    setValidationError(input.checkValidity() ? "" : input.validationMessage);
  };

  return (
    <div className={className + " " + classes.input_container}>
      <input
        ref={inputRef}
        placeholder=" "
        type="text"
        onBlur={handleBlur}
        onChange={onChange}
        disabled={disabled}
        id={id}
        required={required}
        value={value}
        pattern={pattern}
      />
      <label htmlFor={id} className={classes.label}>
        {label}
        {required && " *"}
      </label>
      {validationError && (
        <span className={classes.error_message}>{validationError}</span>
      )}
    </div>
  );
}
