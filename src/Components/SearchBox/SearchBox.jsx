import { useDispatch, useSelector } from "react-redux";

import styles from "./SearchBox.module.css";

import { selectNameFilter } from "../../Redux/filters/selectors";

import { changeFilter } from "../../Redux/filters/slice";

function SearchBox() {
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(changeFilter(event.target.value));
  };
  return (
    <div className={styles.searchWrapper}>
      <p className={styles.title}>Find contact</p>
      <input
        className={styles.search}
        type="text"
        name="search"
        value={filter}
        onChange={handleChange}
        placeholder="name or phone"
      />
    </div>
  );
}

export default SearchBox;