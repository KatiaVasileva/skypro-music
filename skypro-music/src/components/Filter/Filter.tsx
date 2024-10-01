"use client";

import { useState } from "react";
import styles from "./Filter.module.css";
import { FilterProps } from "@/types/FilterProps.types";
import FilterItem from "../FilterItem/FilterItem";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setDateState, setGenreState, setPerformerState } from "@/store/features/filterSlice";

function Filter({ performers, genres, years }: FilterProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const dispatch = useAppDispatch();
  const {performerState, dateState, genreState} = useAppSelector((state) => state.filter);

  let dateOrderArr: Array<string> = [];
  dateOrderArr.push(dateState);

  const handleFilterItemClick = (filterElement: string) => {
    if (activeIndex === 1) {
      dispatch(setPerformerState(filterElement));
    }
    if (activeIndex === 2) {
      dispatch(setDateState(filterElement));
    }
    if (activeIndex === 3) {
      dispatch(setGenreState(filterElement));
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
          selectedValues={performerState}
          selectedFilterCount={performerState.length}
          handleFilterItemClick={handleFilterItemClick}
        />
      )}

      {activeIndex === 2 && (
        <FilterItem
          filterName="year"
          filterContent={years}
          selectedValues={dateOrderArr}
          selectedFilterCount={dateOrderArr.length}
          handleFilterItemClick={handleFilterItemClick}
        />
      )}

      {activeIndex === 3 && (
        <FilterItem
          filterName="genre"
          filterContent={genres}
          selectedValues={genreState}
          selectedFilterCount={genreState.length}
          handleFilterItemClick={handleFilterItemClick}
        />
      )}
    </>
  );
}

export default Filter;
