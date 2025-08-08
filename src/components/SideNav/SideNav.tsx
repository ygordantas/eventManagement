import { useEffect, useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./SideNav.module.css";
import createClassName from "../../utils/createClassName";
import { Link, NavLink } from "react-router";
import HomeIcon from "../../assets/icons/house.svg";
import EnvelopeIcon from "../../assets/icons/envelope.svg";
import StarIcon from "../../assets/icons/star.svg";
import PersonIcon from "../../assets/icons/person.svg";
import BalloonIcon from "../../assets/icons/balloon.svg";
import LogoutIcon from "../../assets/icons/box-arrow-left.svg";
import useAuthContext from "../../hooks/useAuthContext";

type NavItem = {
  label: string;
  iconPath: string;
  path: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/", iconPath: HomeIcon },
  { label: "My events", path: "/my-events", iconPath: StarIcon },
  { label: "Friends", path: "/friends", iconPath: PersonIcon },
  { label: "Events", path: "/events", iconPath: BalloonIcon },
  { label: "Inbox", path: "/inbox", iconPath: EnvelopeIcon },
];

export default function SideNav() {
  const { logout } = useAuthContext();

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const windowSize = window.innerWidth;

      setIsMobile(windowSize < 768);
      setOpen(windowSize >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <Backdrop
        open={false}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      {isMobile && (
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={createClassName(
            classes.toggleButton,
            open && classes.active
          )}
          aria-label={open ? "Close sidebar" : "Open sidebar"}
        >
          <span className={classes.hamburger}>
            <span className={classes.line} />
            <span className={classes.line} />
            <span className={classes.line} />
          </span>
        </button>
      )}

      <aside className={createClassName(classes.sidebar, open && classes.open)}>
        <div className={classes.sidebarContent}>
          <div className={classes.sidebarHeader}>
            <h2>Event Manger</h2>
          </div>
          <nav className={classes.navigation}>
            <ul className={classes.navList}>
              {NAV_ITEMS.map((item, i) => (
                <li className={classes.navItem} key={i}>
                  <NavLink
                    onClick={() => isMobile && setOpen(false)}
                    className={classes.navLink}
                    to={item.path}
                  >
                    <img src={item.iconPath} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className={classes.footer}>
            <Link className={classes.navLink} onClick={logout} to={"/login"}>
              <img src={LogoutIcon} /> <span>Logout</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
