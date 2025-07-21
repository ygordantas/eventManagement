import * as React from "react";
import styles from "./Button.module.css";
import createClassName from "../../utils/createClassName";

type ButtonVariant = "solid" | "outline";

type ButtonProps<E extends React.ElementType> = {
  as?: E;
  variant?: ButtonVariant;
} & React.ComponentPropsWithRef<E>;

export default function Button<E extends React.ElementType = "button">({
  as,
  variant = "solid",
  children,
  ref,
  ...props
}: React.PropsWithChildren<ButtonProps<E>>) {
  const Component = (as ?? "button") as React.ElementType;

  const { className, ...remainingProps } = props;

  const btnClasses = createClassName(
    className,
    styles.btn,
    variant === "solid" ? styles.solid : styles.outline
  );

  return (
    <Component ref={ref} className={btnClasses} {...remainingProps}>
      {children}
    </Component>
  );
}
