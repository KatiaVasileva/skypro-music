import { useState } from "react";
import styles from "./FilterItem.module.css";
import classNames from "classnames";

type FilterItemProps = {
  filterName: string;
  filterContent: Array<string>;
  selectedValues: Array<string>;
  handleFilterItemClick: (filterElement: string) => void;
};

function FilterItem({
  filterName,
  filterContent,
  selectedValues,
  handleFilterItemClick,
}: FilterItemProps) {
  const [isFilterElementClicked, setIsFilterElementClicked] = useState(false);

//   const filters: Array<string> = []; 

  const handleFilterElementClick = () => {
    setIsFilterElementClicked((prevState) => !prevState);
  };

  return (
    <div className={styles.popup}>
      <div
        className={classNames(
          styles.popupContainer,
          filterName === "performer"
            ? styles.popupContainerAuthor
            : filterName === "year"
            ? styles.popupContainerYear
            : styles.popupContainerGenre
        )}
      >
        <div className={styles.popupBox}>
          <div className={styles.popupContent}>
            {filterContent.map((filterElement, index) => (
              <p
                className={classNames(styles.popupText, {[styles.popupTextActive]: selectedValues.includes(filterElement),})}
                key={index}
                onClick={() => {
                  handleFilterItemClick(filterElement);
                }}
              >
                {filterElement}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterItem;
