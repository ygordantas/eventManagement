import classes from "./EmptyState.module.css";

type EmptyStateProps = {
  message: string;
  icon?: React.ReactNode;
};

export default function EmptyState({ message, icon }: EmptyStateProps) {
  return (
    <div className={classes.emptyState}>
      {icon && <div className={classes.icon}>{icon}</div>}
      <p className={classes.message}>{message}</p>
    </div>
  );
}
