import type { PropsWithChildren } from "react";
import classes from "./PageHeader.module.css";

type PageHeaderProps = {
  title: string;
};
export default function PageHeader({
  title,
  children,
}: PropsWithChildren<PageHeaderProps>) {
  return (
    <div className={classes.header}>
      <h1 className={classes.title}>{title}</h1>
      {children && <div className={classes.actions}>{children}</div>}
    </div>
  );
}
