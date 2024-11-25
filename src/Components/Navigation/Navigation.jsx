import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { selectIsLoggedIn } from "../../Redux/auth/selectors";

import styles from "./Navigation.module.css";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const buildClasses = ({ isActive }) => {
    return clsx(styles.link, isActive === true && styles.active);
  };

  return (
    <div>
      <NavLink className={buildClasses} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={buildClasses} to="/contacts">
          Contacts
        </NavLink>
      )}
    </div>
  );
};

export default Navigation;