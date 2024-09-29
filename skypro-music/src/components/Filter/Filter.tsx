import { useState } from "react";
import styles from "./Filter.module.css";
import classNames from "classnames";
import { FilterProps } from "@/types/FilterProps.types";
import FilterItem from "../FilterItem/FilterItem";

function Filter({ performers, genres, years }: FilterProps) {
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
                  <FilterItem filterName={performer} key={performer} />
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
            <div className={styles.popupBox}>
              <div className={styles.popupContent}>
                {years.map((year) => (
                  <FilterItem filterName={year} key={year} />
                ))}
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
                  <FilterItem filterName={genre} key={genre} />
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
