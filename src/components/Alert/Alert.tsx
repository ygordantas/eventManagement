import { useEffect, useState } from "react";
import createClassName from "../../utils/createClassName";
import classes from "./Alert.module.css";

type AlertProps = {
  type: "success" | "error" | "warning" | "info";
  message: string;
  autoDismiss?: boolean;
  dismissTimeInMs?: number;
};

export default function Alert({ type, message, autoDismiss = false, dismissTimeInMs = 2000 }: AlertProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!autoDismiss) return;

    const timer = setTimeout(() => setShow(false), dismissTimeInMs);

    return () => clearTimeout(timer);
  }, [autoDismiss, dismissTimeInMs]);

  return (
    <div className={createClassName(classes.container, classes[type], !show && classes.slideOut)} role='alert'>
      <div className={classes.content}>
        <div>{message}</div>
        <button className={classes.close} onClick={() => setShow(false)}>
          X
        </button>
      </div>
    </div>
  );
}
