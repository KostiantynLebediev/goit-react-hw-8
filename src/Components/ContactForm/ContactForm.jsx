import css from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MdPersonAdd } from 'react-icons/md';
import * as Yup from 'yup';
import { addContact } from '../../redux/contacts/operations';

const initialValues = {
  name: '',
  number: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  number: Yup.string()
    .min(5, 'Too short!')
    .max(13, 'Too long!')
    .required('Required'),
});

function ContactForm() {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();

  function handleSubmit(values, actions) {
    dispatch(addContact({ ...values }));
    actions.resetForm();
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      <Form className={css.form}>
        <div className={css.formElementWrapper}>
          <label htmlFor={nameFieldId} className={css.label}>
            Name
          </label>
          <Field
            type="text"
            name="name"
            id={nameFieldId}
            className={css.input}
          />
          <ErrorMessage
            name="name"
            component="p"
            className={css.errorMessage}
          />
        </div>
        <div className={css.formElementWrapper}>
          <label htmlFor={numberFieldId} className={css.label}>
            Number
          </label>
          <Field
            type="text"
            name="number"
            id={numberFieldId}
            className={css.input}
          />
          <ErrorMessage
            name="number"
            component="p"
            className={css.errorMessage}
          />
        </div>
        <button type="submit" className={css.submitButton}>
          Add contact
          <MdPersonAdd className={css.personAddIcon} />
        </button>
      </Form>
    </Formik>
  );
}

export default ContactForm;