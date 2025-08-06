import type { PropsWithChildren } from "react";
import classes from "./Backdrop.module.css";

type BackdropProps = {
  open: boolean;
  onClose: () => void;
  zIndex?: number;
};

export default function Backdrop({
  open,
  onClose,
  zIndex = 999,
  children,
}: PropsWithChildren<BackdropProps>) {
  return (
    open && (
      <div style={{ zIndex }} className={classes.backdrop} onClick={onClose}>
        {children}
      </div>
    )
  );
}
