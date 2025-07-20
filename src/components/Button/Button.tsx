import type { PropsWithChildren } from "react";
import classes from "./Button.module.css";

type ButtonProps = {
  as?: "a" | "button";
  variant?: "solid" | "outline";
};

export default function Button({
  children,
  variant = "solid",
  as = "button",
  ...props
}: PropsWithChildren<ButtonProps>) {
  const Component = as;
  const btnClasses = `${props.className} ${classes.btn} ${
    variant === "solid" ? classes.solid : classes.outline
  }`;

  return (
    <Component
      {...props}
      style={props.style}
      target={props.target}
      href={props.href}
      className={btnClasses}
      type={props.type}
      onClick={props.onClick}
    >
      {children}
    </Component>
  );
}
