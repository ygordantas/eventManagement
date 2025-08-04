import { Outlet } from "react-router";
import SidebarNav from "../SidebarNav/SidebarNav";
import classes from "./Layout.module.css";

export default function Layout() {
  return (
    <>
      <SidebarNav />
      <main className={classes.main}>
        <Outlet />
      </main>
    </>
  );
}
