import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectIsLoggedIn } from "../../redux/auth/selectors";

const PrivateRoute = ({ component: Component, restrictedTo = "/" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? Component : <Navigate to={restrictedTo} />;
};

export default PrivateRoute;