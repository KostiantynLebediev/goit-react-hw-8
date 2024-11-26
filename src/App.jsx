import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { selectIsRefreshing } from "./redux/auth/selectors.js";

import Layout from "./сomponents/Layout/Layout.jsx";
import Loader from "./сomponents/Loader/Loader.jsx";

import RestrictedRoute from "./сomponents/RestrictedRoute/RestrictedRoute.jsx";
import PrivateRoute from "./сomponents/PrivateRoute/PrivateRout.jsx";
import { refreshUser } from "./redux/auth/operations.js";

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RigistationPage.jsx")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const ContactsPage = lazy(() => import("./pages/ContactPage/ContactPage.jsx"));

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
