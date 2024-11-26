import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";

import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import Loader from "../../components/Loader/Loader";
import styles from "./ContactPage.module.css";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.pageWrapper}>
      <p className={styles.title}>Phonebook</p>
      <div className={styles.mainContentWrapper}>
        <div className={styles.leftSide}>
          <ContactForm />
          <SearchBox />
        </div>
        <div className={styles.rightSide}>
          {loading && (
            <div className={styles.loader}>
              <Loader />
            </div>
          )}

          {!error ? <ContactList /> : <div>ERROR</div>}
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;