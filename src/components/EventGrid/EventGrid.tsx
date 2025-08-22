import type { PropsWithChildren } from "react";
import classes from "./EventGrid.module.css";

export default function EventGrid({ children }: PropsWithChildren) {
  return <div className={classes.eventsGrid}>{children}</div>;
}
