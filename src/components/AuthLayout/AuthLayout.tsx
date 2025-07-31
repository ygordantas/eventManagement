import classes from "./AuthLayout.module.css";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <section className={classes.section}>
      <div className={classes.form_container}>
        <Outlet />
      </div>
    </section>
  );
}
