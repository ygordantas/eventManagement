import { useRef, useState } from "react";
import classes from "./SelectInput.module.css";

type SelectInputProps = {
  id?: string;
  label?: string;
  value?: string;
  options: { value: string | number; label: string }[];
  className?: string;
  required?: boolean;
  disabled?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement, Element>) => void;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function SelectInput({
  id = "",
  label = "",
  value = "",
  options,
  className = "",
  required = false,
  disabled = false,
  onBlur = () => {},
  onChange = () => {},
}: SelectInputProps) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [validationError, setValidationError] = useState("");
  const [touched, setTouched] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement, Element>) => {
    onBlur(e);
    const select = selectRef.current;
    if (!select) return;
    setValidationError(select.checkValidity() ? "" : select.validationMessage);
    setTouched(true);
  };

  const errorClasses = [
    touched && validationError ? classes.hasError : "",
  ].join(" ");

  return (
    <div className={className + " " + classes.input_container}>
      <select
        ref={selectRef}
        id={id}
        required={required}
        disabled={disabled}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
        className={value ? classes.has_value : errorClasses}
      >
        <option value="" disabled={required} hidden={required} />
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
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
