import styles from "./FilterItem.module.css";

function FilterItem({ filterName }: { filterName: string }) {
  return <p className={styles.popupText}>{filterName}</p>;
  
}

export default FilterItem;
