import { useRef, useState } from "react";
import classes from "./SelectInput.module.css";
import createClassName from "../../utils/createClassName";

type SelectInputProps = {
  options: { value: string | number; label: string }[];
  label?: string;
} & React.ComponentPropsWithRef<"select">;

export default function SelectInput({
  label = "",
  options,
  ...props
}: SelectInputProps) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [validationError, setValidationError] = useState("");
  const [touched, setTouched] = useState(false);

  const { className, onBlur, ...remainingProps } = props;

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement, Element>) => {
    onBlur?.(e);
    const select = selectRef.current;
    if (!select) return;
    setValidationError(select.checkValidity() ? "" : select.validationMessage);
    setTouched(true);
  };

  const errorClasses = [
    touched && validationError ? classes.hasError : "",
  ].join(" ");

  return (
    <div className={createClassName(className, classes.input_container)}>
      <select
        ref={selectRef}
        onBlur={handleBlur}
        className={remainingProps.value ? classes.has_value : errorClasses}
        {...remainingProps}
      >
        <option
          value=""
          disabled={remainingProps.required}
          hidden={remainingProps.required}
        />
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label htmlFor={remainingProps.id} className={classes.label}>
        {label}
        {remainingProps.required && " *"}
      </label>
      {validationError && (
        <span className={classes.error_message}>{validationError}</span>
      )}
    </div>
  );
}
