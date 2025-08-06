import createClassName from "../../utils/createClassName";
import classes from "./Alert.module.css";
export type AlertType = "success" | "error" | "warning" | "info";

type AlertProps = {
  type?: AlertType;
  message?: string;
  show?: boolean;
  onClose?: () => void;
};

export default function Alert({
  show,
  type = "info",
  message = "",
  onClose,
}: AlertProps) {
  return (
    <div
      className={createClassName(
        classes.container,
        classes[type],
        !show && classes.slideOut
      )}
      role="alert"
    >
      <div className={classes.content}>
        <div>{message}</div>
        <button className={classes.close} onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
