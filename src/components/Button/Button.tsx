import { useRef, type PropsWithChildren } from "react";
import classes from "./Button.module.css";
import createClassName from "../../utils/createClassName";

type ButtonProps<T extends React.ElementType> = {
  as?: T;
  variant?: "solid" | "outline";
  disabled?: boolean;
} & React.ComponentPropsWithRef<T>;


export default function Button<T extends React.ElementType = "button">({
  children,
  as = "button",
  variant = "solid",
  disabled = false,
  className,
  ...props
}: PropsWithChildren<ButtonProps<T>>) {
  
  const Component = as;
  const internalRef = useRef<HTMLElement>(null);
  
  const btnClasses = createClassName(
    className,
    classes.btn,
    variant === "solid" ? classes.solid : classes.outline,
    disabled && classes.disabled
  );

  return (
    <Component
      {...props} 
      ref={internalRef} 
      className={btnClasses} 
      disabled = {as === "button" ? disabled : undefined}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        if (disabled) {
          e.preventDefault();
          e.stopPropagation();
        }
        props.onClick?.(e);
      }}>
        {children}
    </Component>
  );
}
