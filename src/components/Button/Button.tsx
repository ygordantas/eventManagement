import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
} from "react";
import classes from "./Button.module.css";

type Variant = "solid" | "outline";

interface BaseProps {
  variant?: Variant;
}

interface AnchorProps
  extends BaseProps,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  as: "a";
}

interface NativeButtonProps
  extends BaseProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
}

type ButtonProps = AnchorProps | NativeButtonProps;

export default function Button({
  children,
  variant = "solid",
  as = "button",
  ...props
}: PropsWithChildren<ButtonProps>) {
  const btnClasses = `${props.className} ${classes.btn} ${
    variant === "solid" ? classes.solid : classes.outline
  }`;

  if (as === "a") {
    const anchorProps = props as AnchorProps;
    return (
      <a {...anchorProps} className={btnClasses}>
        {children}
      </a>
    );
  }

  const buttonProps = props as NativeButtonProps;

  return (
    <button {...buttonProps} style={props.style} className={btnClasses}>
      {children}
    </button>
  );
}
