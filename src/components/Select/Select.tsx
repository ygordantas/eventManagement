import createClassName from "../../utils/createClassName";
import classes from "./Select.module.css";
import type Option from "../../models/Option";
import useFormElementValidation from "../../hooks/useFormElementValidation";

type SelectProps = {
  label: string;
  options: Option[];
} & React.ComponentPropsWithoutRef<"select">;

export default function Select({ label, options, ...props }: SelectProps) {
  const { ref, errorMessage, onBlurHandler } =
    useFormElementValidation<HTMLSelectElement>();

  const { className, onBlur, id, name, ...remainingProps } = props;

  return (
    <div className={createClassName(className, classes.select_container)}>
      <select
        onBlur={(e) => onBlurHandler(e, onBlur)}
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
          <option key={opt.code} value={opt.code}>
            {opt.value}
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
