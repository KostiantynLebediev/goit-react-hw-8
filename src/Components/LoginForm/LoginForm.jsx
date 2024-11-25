import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { login } from "../../redux/auth/operations";

import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(8, "At least 8 characters").required("Required"),
  });

  return (
    <div className={styles.pageWrapper}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        <Form className={styles.form}>
          <label>
            Email
            <Field type="email" name="email" placeholder="Enter email..." />
            <ErrorMessage
              className={styles.errorMessage}
              name="email"
              component="span"
            />
          </label>
          <label>
            Password
            <Field
              type="password"
              name="password"
              placeholder="Enter password..."
            />
            <ErrorMessage
              className={styles.errorMessage}
              name="password"
              component="span"
            />
          </label>
          <button className={styles.btn} type="submit">
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;