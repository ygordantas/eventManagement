import { useRef, useState } from "react";
import createClassName from "../../utils/createClassName";
import classes from "./Select.module.css";

type SelectOption = {
  value: string | number;
  label: string;
};

type SelectProps = {
  label: string;
  options: SelectOption[];
} & React.ComponentPropsWithoutRef<"select">;

export default function Select({ label, options, ...props }: SelectProps) {
  const ref = useRef<HTMLSelectElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { className, onBlur, id, name, ...remainingProps } = props;

  const onBlurHandler = (e: React.FocusEvent<HTMLSelectElement, Element>) => {
    onBlur?.(e);

    const input = ref.current;

    if (!input) return;

    setErrorMessage(input.checkValidity() ? "" : input.validationMessage);
  };

  return (
    <div className={createClassName(className, classes.select_container)}>
      <select
        onBlur={onBlurHandler}
        ref={ref}
        id={id ?? label}
        name={name ?? label}
        className={createClassName(
          Boolean(remainingProps.value) && classes.has_value,
          errorMessage && classes.has_error
        )}
        {...remainingProps}
      >
        <option value="" hidden={remainingProps.required} />
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label htmlFor={id ?? label}>
        {label} {remainingProps.required && "*"}
      </label>
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
}
