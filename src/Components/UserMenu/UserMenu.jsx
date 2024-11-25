import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../reduxs/auth/selectors";
import { logout } from "../../reduxs/auth/operations";
import { resetContacts } from "../../reduxs/contacts/slice";

import styles from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleClick = () => {
    dispatch(logout());
    dispatch(resetContacts());
  };
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        Welcome,{" "}
        <span className={styles.name}>{user.name !== null && user.name}</span>
      </p>
      <button className={styles.logoutBtn} onClick={handleClick} type="button">
        Logout
      </button>
    </div>
  );
};

export default UserMenu;