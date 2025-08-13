import createClassName from "../../utils/createClassName";
import classes from "./Textarea.module.css";
import useFormElementValidation from "../../hooks/useFormElementValidation";

type TextareaProps = {
  label: string;
} & React.ComponentPropsWithoutRef<"textarea">;

export default function Textarea({ label, ...props }: TextareaProps) {
  const { ref, errorMessage, onBlurHandler } =
    useFormElementValidation<HTMLTextAreaElement>();

  const { className, onBlur, placeholder, id, name, ...remainingProps } = props;

  return (
    <div className={createClassName(className, classes.textarea_container)}>
      <textarea
        ref={ref}
        id={id ?? label}
        name={name ?? label}
        onBlur={(e) => onBlurHandler(e, onBlur)}
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
