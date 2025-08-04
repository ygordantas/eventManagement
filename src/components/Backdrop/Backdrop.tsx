import type { PropsWithChildren } from "react";
import classes from "./Backdrop.module.css";

interface BackdropProps {
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
}

export default function Backdrop({ isOpen, onClose, children, zIndex = 999 }: PropsWithChildren<BackdropProps>) {
  if (!isOpen) return null;

  return (
    <div className={classes.backdrop} style={{ zIndex }} onClick={onClose}>
      {children}
    </div>
  );
}
