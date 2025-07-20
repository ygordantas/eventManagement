import classes from "./Input.module.css";

export default function Input({ ...props }) {
  return (
    <input className={`${props.className ?? ""} ${classes.input}`} {...props} />
  );
}
