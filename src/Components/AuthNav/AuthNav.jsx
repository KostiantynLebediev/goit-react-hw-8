import { NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./AuthNav.module.css";

const AuthNav = () => {
  const buildClasses = ({ isActive }) => {
    return clsx(styles.link, isActive === true && styles.active);
  };

  return (
    <div className={styles.wrapper}>
      <NavLink className={buildClasses} to="/register">
        Register
      </NavLink>
      <NavLink className={buildClasses} to="/login">
        Login
      </NavLink>
    </div>
  );
};

export default AuthNav;