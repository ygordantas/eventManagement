import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./SidebarNav.module.css";

type navItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

type SidebarProps = {
  navItems: navItem[];
  footer?: React.ReactNode;
};

export default function SidebarNav({ navItems, footer }: SidebarProps) {
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

      <aside className={`${classes.sidebar} ${isOpen ? classes.open : ""}`}>
        <div className={classes.sidebarContent}>
          <div className={classes.sidebarHeader}>
            <h2 className={classes.logo}>Event Manager</h2>
          </div>

          <nav className={classes.navigation}>
            <ul className={classes.navList}>
              {navItems.map((item) => (
                <li className={classes.navItem} key={item.label}>
                  <NavLink to={item.path} className={classes.navLink}>
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {footer && <div className={classes.sidebarFooter}>{footer}</div>}
        </div>
      </aside>
    </>
  );
}
