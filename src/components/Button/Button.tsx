import type { PropsWithChildren } from "react";
import classes from "./Button.module.css";
import createClassName from "../../utils/createClassName";

type ButtonProps<T extends React.ElementType> = {
  as?: T;
  variant?: "solid" | "outline";
} & React.ComponentPropsWithRef<T>;

export default function Button<T extends React.ElementType = "button">({
  ref,
  children,
  as = "button",
  variant = "solid",
  ...props
}: PropsWithChildren<ButtonProps<T>>) {
  const Component = as as React.ElementType;

  const { className, ...remainingProps } = props;

  const btnClasses = createClassName(
    className,
    classes.btn,
    variant === "solid" ? classes.solid : classes.outline
  );

  return (
    <Component ref={ref} className={btnClasses} {...remainingProps}>
      {children}
    </Component>
  );
}
