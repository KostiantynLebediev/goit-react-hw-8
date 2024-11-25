import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { selectIsRefreshing } from "./Redux/auth/selectors";

import Layout from "./Components/Layout/Layout";
import Loader from "./Components/Loader/Loader";

import RestrictedRoute from "./Components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./Components/PrivateRoute/PrivateRout";
import { refreshUser } from "./Redux/auth/operations";

const HomePage = lazy(() => import("./Pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("./Pages/RegistrationPage/RigistationPage")
);
const LoginPage = lazy(() => import("./Pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("./Pages/ContactPage/ContactPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {isRefreshing ? (
        <div>
          <Loader />
        </div>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  restrictedTo="/contacts"
                  component={<RegistrationPage />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  restrictedTo="/contacts"
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  restrictedTo="/login"
                  component={<ContactsPage />}
                />
              }
            />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;