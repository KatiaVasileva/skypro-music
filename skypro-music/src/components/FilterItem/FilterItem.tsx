import styles from "./FilterItem.module.css";
import classNames from "classnames";

function FilterItem({
  filterName,
  filterContent,
}: {
  filterName: string;
  filterContent: Array<string>;
}) {
  return (
    <div className={styles.popup}>
      <div
        className={classNames(
          styles.popupContainer,
          (filterName === "performer"
            ? styles.popupContainerAuthor
            : (filterName === "year"
                ? styles.popupContainerYear
                : styles.popupContainerGenre))
        )}
      >
        <div className={styles.popupBox}>
          <div className={styles.popupContent}>
            {filterContent.map((filterElement: string) => (
              <p className={styles.popupText} key={filterElement}>{filterElement}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterItem;
