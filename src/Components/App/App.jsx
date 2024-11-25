import { Layout } from '../Layout/Layout';
import { PrivateRoute } from '../PrivateRoute/PrivateRout';
import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute';
import { refreshUser } from '../../Redux/auth/operations';
import { selectIsRefreshing } from '../../Redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useEffect, lazy } from 'react';

const HomePage = lazy(() => import('../../Pages/HomePage/HomePage'));
const RegistrationPage = lazy(() =>
  import('../../Pages/RegistrationPage/RigistationPage')
);
const LoginPage = lazy(() => import('../../Pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() =>
  import('../../Pages/ContactPage/ContactPage')
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegistrationPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;