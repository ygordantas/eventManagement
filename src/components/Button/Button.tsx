import type { PropsWithChildren } from "react";
import classes from "./Button.module.css";
import createClassName from "../../utils/createClassName";

type ButtonProps<T extends React.ElementType> = {
  as?: T;
  variant?: "solid" | "outline";
  align?: "center" | "right" | "left";
} & React.ComponentPropsWithRef<T>;

// Polymorphic element
export default function Button<T extends React.ElementType = "button">({
  ref,
  children,
  as = "button",
  variant = "solid",
  align,
  ...props
}: PropsWithChildren<ButtonProps<T>>) {
  const Component = as as React.ElementType;

  const { className, disabled, href, target, ...remainingProps } = props;

  const btnClasses = createClassName(
    className,
    classes.btn,
    variant === "solid" ? classes.solid : classes.outline,
    disabled && classes.disabled,
    align && classes[`align_${align}`]
  );

  return (
    <Component
      ref={ref}
      href={href && !disabled ? href : "#"}
      target={target && !disabled ? target : ""}
      className={btnClasses}
      disabled={disabled}
      {...remainingProps}>
      {children}
    </Component>
  );
}
