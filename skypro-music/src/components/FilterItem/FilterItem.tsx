import styles from "./FilterItem.module.css";
import classNames from "classnames";

type FilterItemProps = {
  filterName: string;
  filterContent: Array<string>;
  selectedValues: Array<string>;
  handleFilterItemClick: (filterElement: string) => void;
  handleFilterElementClick?: () => void;
  isFilterElementClicked?: boolean;

};

function FilterItem({
  filterName,
  filterContent,
  selectedValues,
  handleFilterItemClick,
  handleFilterElementClick,
  isFilterElementClicked,
}: FilterItemProps) {

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
                className={classNames(
                  styles.popupText,
                    {
                      [styles.popupTextActive]:
                        selectedValues.includes(filterElement),
                      [styles.popupTextInactive]:
                        filterName === "year" && 
                        !selectedValues.includes(filterElement) && isFilterElementClicked,
                    },
                )}
                key={index}
                onClick={() => {
                  handleFilterItemClick(filterElement);
                  if (handleFilterElementClick) {
                    handleFilterElementClick();
                  }
                  console.log(isFilterElementClicked);
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
