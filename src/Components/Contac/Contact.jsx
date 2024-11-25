import styles from "./Contact.module.css";
import { deleteContact } from "../../Redux/contacts/operations";

import { FaPhone } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { useDispatch } from "react-redux";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id))
      .unwrap()
      .catch((error) => console.error("Failed to delete contact:", error));
  };

  return (
    <div className={styles.item}>
      <div className={styles.container}>
        <div className={styles.swipper}>
          <IoPerson style={{ fontSize: "12px" }} />
          <p className={styles.text}>{contact.name}</p>
        </div>
        <div className={styles.swipper}>
          <FaPhone style={{ fontSize: "12px" }} />
          <p className={styles.text}>{contact.number}</p>
        </div>
      </div>
      <button className={styles.delete} type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Contact;