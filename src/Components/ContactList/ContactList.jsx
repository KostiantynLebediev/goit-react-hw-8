import { useSelector } from "react-redux";

import Contact from "../Contact/Contact.jsx";

import { selectFilteredContacts } from "../../Redux/contacts/selectors.js";

import styles from "./ContactList.module.css";

function ContactList() {
  const visibleContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={styles.contactList}>
      {visibleContacts.map((contact) => {
        return (
          <li key={contact.id}>
            <Contact contact={contact} />
          </li>
        );
      })}
    </ul>
  );
}

export default ContactList;