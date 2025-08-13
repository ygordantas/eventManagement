import createClassName from "../../utils/createClassName";
import classes from "./Input.module.css";
import useFormElementValidation from "../../hooks/useFormElementValidation";

type InputProps = {
  label: string;
} & React.ComponentPropsWithoutRef<"input">;

export default function Input({ label, ...props }: InputProps) {
  const { ref, errorMessage, onBlurHandler } =
    useFormElementValidation<HTMLInputElement>();
  const { className, onBlur, placeholder, id, name, ...remainingProps } = props;

  return (
    <div className={createClassName(className, classes.input_container)}>
      <input
        ref={ref}
        id={id ?? label}
        name={name ?? label}
        onBlur={(e) => onBlurHandler(e, onBlur)}
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
