import type { PropsWithChildren } from "react";
import classes from "./PageHeader.module.css";
import { ErrorBoundary } from "react-error-boundary";

type PageHeaderProps = {
  title: string;
};
export default function PageHeader({
  title,
  children,
}: PropsWithChildren<PageHeaderProps>) {
  return (
    <ErrorBoundary fallback="test">
      <div className={classes.header}>
        <h1 className={classes.title}>{title}</h1>
        {children && <div className={classes.actions}>{children}</div>}
      </div>
    </ErrorBoundary>
  );
}
