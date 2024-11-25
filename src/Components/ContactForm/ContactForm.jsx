import { useId } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { MdOutlineContactPhone } from "react-icons/md";

import styles from "./ContactForm.module.css";

import { addContact } from "../../Redux/contacts/operations";
import toast from "react-hot-toast";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
});

function ContactForm() {
  const userNameId = useId();
  const userTelId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values)).then(() => {
      toast.success("Contact added successfully!", {
        icon: <MdOutlineContactPhone size={30} />,
        position: "top-right",
      });
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={contactSchema}
    >
      <Form className={styles.form}>
        <p className={styles.title}>Add Contact</p>
        <div className={styles.inputWrapper}>
          <label htmlFor={userNameId}>Name</label>
          <Field
            type="text"
            name="name"
            id={userNameId}
            placeholder="Enter your name..."
          />
          <ErrorMessage
            className={styles.errorMessage}
            name="name"
            component="span"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor={userTelId}>Number</label>
          <Field
            type="tel"
            name="number"
            id={userTelId}
            placeholder="+XXX (XX) XXX-XXXX"
          />
          <ErrorMessage
            className={styles.errorMessage}
            name="number"
            component="span"
          />
        </div>
        <button className={styles.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

export default ContactFo