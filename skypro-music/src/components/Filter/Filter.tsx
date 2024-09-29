"use client";

import { useState } from "react";
import styles from "./Filter.module.css";
import { FilterProps } from "@/types/FilterProps.types";
import FilterItem from "../FilterItem/FilterItem";
import { useAppDispatch } from "@/store/store";
import { setPerformerState } from "@/store/features/filterSlice";

function Filter({ performers, genres, years }: FilterProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const dispatch = useAppDispatch();

  const handleFilterItemClick = (filterElement: string, selectedFilterElements: Array<string>) => {
    if (activeIndex === 1) {
      dispatch(setPerformerState(filterElement));
    }
  };

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
        <FilterItem
          filterName="performer"
          filterContent={performers}
          handleFilterItemClick={handleFilterItemClick}
        />
      )}

      {activeIndex === 2 && (
        <FilterItem
          filterName="year"
          filterContent={years}
          handleFilterItemClick={handleFilterItemClick}
        />
      )}

      {activeIndex === 3 && (
        <FilterItem
          filterName="genre"
          filterContent={genres}
          handleFilterItemClick={handleFilterItemClick}
        />
      )}
    </>
  );
}

export default Filter;
