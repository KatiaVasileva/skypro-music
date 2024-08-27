import { useState } from "react";
import styles from "./Filter.module.css";
import classNames from "classnames";
import { FilterProps } from "@/types/FilterProps.types";

function Filter({ performers, genres }: FilterProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <>
      <div className={styles.filter}>
        <div className={styles.filterTitle}>Искать по:</div>
        <div
          className={
            activeIndex === 1 ? styles.filterButtonActive : styles.filterButton
          }
          onClick={() =>
            activeIndex === 1 ? setActiveIndex(0) : setActiveIndex(1)
          }
        >
          исполнителю
        </div>
        <div
          className={
            activeIndex === 2 ? styles.filterButtonActive : styles.filterButton
          }
          onClick={() =>
            activeIndex === 2 ? setActiveIndex(0) : setActiveIndex(2)
          }
        >
          году выпуска
        </div>
        <div
          className={
            activeIndex === 3 ? styles.filterButtonActive : styles.filterButton
          }
          onClick={() =>
            activeIndex === 3 ? setActiveIndex(0) : setActiveIndex(3)
          }
        >
          жанру
        </div>
      </div>

      {activeIndex === 1 && (
        <div className={styles.popup}>
          <div
            className={classNames(
              styles.popupContainer,
              styles.popupContainerAuthor
            )}
          >
            <div className={styles.popupBox}>
              <div className={styles.popupContent}>
                {performers.map((performer) => (
                  <p className={styles.popupText} key={performer}>
                    {performer}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeIndex === 2 && (
        <div className={styles.popup}>
          <div
            className={classNames(
              styles.popupContainer,
              styles.popupContainerYear
            )}
          >
            <div className={styles.popupBoxYear}>
              <div className={styles.popupContentYear}>
                <p className={styles.popupText}>По умолчанию</p>
                <p className={styles.popupText}>Сначала новые</p>
                <p className={styles.popupText}>Сначала старые</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeIndex === 3 && (
        <div className={styles.popup}>
          <div
            className={classNames(
              styles.popupContainer,
              styles.popupContainerGenre
            )}
          >
            <div className={styles.popupBox}>
              <div className={styles.popupContent}>
                {genres.map((genre) => (
                  <p className={styles.popupText} key={genre}>
                    {genre}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Filter;
