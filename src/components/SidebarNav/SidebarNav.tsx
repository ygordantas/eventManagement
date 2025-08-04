import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import FriendsIcon from "../../assets/icons/friends.svg";
import HomeIconPath from "../../assets/icons/home.svg";
import InboxIcon from "../../assets/icons/mail_icon.svg";
import EventsIcon from "../../assets/icons/party.svg";
import MyEventsIcon from "../../assets/icons/star.svg";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./SidebarNav.module.css";

type navItem = {
  label: string;
  iconPath: string;
  path: string;
};

const NAV_ITEMS: navItem[] = [
  {
    label: "Home",
    iconPath: HomeIconPath,
    path: "/",
  },
  {
    label: "Events",
    iconPath: EventsIcon,
    path: "/events",
  },
  {
    label: "Friends",
    iconPath: FriendsIcon,
    path: "/friends",
  },
  {
    label: "My Events",
    iconPath: MyEventsIcon,
    path: "/my-events",
  },
  {
    label: "Inbox",
    iconPath: InboxIcon,
    path: "/inbox",
  },
];

export default function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isMobile && (
        <>
          <Backdrop isOpen={isMobile && isOpen} onClose={() => setIsOpen(false)} />

          <button
            className={`${classes.toggleButton} ${isOpen ? classes.active : ""}`}
            onClick={toggleSidebar}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}>
            <span className={classes.hamburger}>
              <span className={classes.line} />
              <span className={classes.line} />
              <span className={classes.line} />
            </span>
          </button>
        </>
      )}

      <aside className={`${classes.sidebar} ${isOpen ? classes.open : ""}`}>
        <div className={classes.sidebarContent}>
          <div className={classes.sidebarHeader}>
            <h2 className={classes.logo}>Event Manager</h2>
          </div>

          <nav className={classes.navigation}>
            <ul className={classes.navList}>
              {NAV_ITEMS.map((item) => (
                <li className={classes.navItem} key={item.label}>
                  <NavLink onClick={() => isMobile && setIsOpen(false)} to={item.path} className={classes.navLink}>
                    <img width={24} height={24} src={item.iconPath} alt={item.label} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={classes.sidebarFooter}>Logout</div>
        </div>
      </aside>
    </>
  );
}
