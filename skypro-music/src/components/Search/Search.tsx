import Icon from "../Icon/Icon";
import styles from "./Search.module.css";

function Search() {
  return (
    <div className={styles.search}>
      <Icon iconClass={styles.searchSvg} name="icon-search" />
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
      />
    </div>
  );
}

export default Search;
