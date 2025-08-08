import { Outlet } from "react-router";
import SideNav from "../SideNav/SideNav";
import classes from "./Layout.module.css";

export default function Layout() {
  return (
    <>
      <SideNav />
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
}
