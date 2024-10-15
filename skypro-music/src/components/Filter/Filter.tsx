"use client";

import { useCallback, useState } from "react";
import styles from "./Filter.module.css";
import { FilterProps } from "@/types/FilterProps.types";
import FilterItem from "../FilterItem/FilterItem";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setDateState,
  setGenreState,
  setPerformerState,
} from "@/store/features/filterSlice";
import Skeleton from "react-loading-skeleton";

function Filter({ performers, genres, years }: FilterProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFilterElementClicked, setIsFilterElementClicked] = useState(false);
  const dispatch = useAppDispatch();
  const { performerState, dateState, genreState } = useAppSelector(
    (state) => state.filter
  );
  const isLoading = useAppSelector((state) => state.track.isLoading);

  const handleFilterItemClick = useCallback(
    (filterElement: string) => {
      if (activeIndex === 1) {
        dispatch(setPerformerState(filterElement));
      }
      if (activeIndex === 2) {
        dispatch(setDateState(filterElement));
      }
      if (activeIndex === 3) {
        dispatch(setGenreState(filterElement));
      }
    },
    [activeIndex, dispatch]
  );

  const handleFilterElementClick = () => {
    setIsFilterElementClicked((prev) => !prev);
  };

  const selectedPerformerFilterCount = performerState.length;
  const selectedYearFilterCount = dateState.length;
  const selectedGenreFilterCount = genreState.length;

  return (
    <>
      <div className={styles.filter}>
        <div className={styles.filterTitle}>
          {isLoading ? <Skeleton width={86} height={24} /> : "Искать по:"}
        </div>
        {isLoading && (
          <Skeleton
            width={156}
            height={38}
            count={3}
            containerClassName={styles.skeletonContainer}
            style={{ borderRadius: "60px" }}
          />
        )}

        {!isLoading && (
          <>
            <div
              className={
                activeIndex === 1
                  ? styles.filterButtonActive
                  : styles.filterButton
              }
              onClick={() =>
                activeIndex === 1 ? setActiveIndex(0) : setActiveIndex(1)
              }
            >
              исполнителю
            </div>
            {selectedPerformerFilterCount > 0 && (
              <span
                className={styles.selectedPerformerFilterCount}
                data-testid="author-count"
              >
                {selectedPerformerFilterCount}
              </span>
            )}

            <div
              className={
                activeIndex === 2
                  ? styles.filterButtonActive
                  : styles.filterButton
              }
              onClick={() =>
                activeIndex === 2 ? setActiveIndex(0) : setActiveIndex(2)
              }
            >
              году выпуска
            </div>
            {selectedYearFilterCount > 0 && (
              <span
                className={styles.selectedYearFilterCount}
                data-testid="date-count"
              >
                {selectedYearFilterCount}
              </span>
            )}

            <div
              className={
                activeIndex === 3
                  ? styles.filterButtonActive
                  : styles.filterButton
              }
              onClick={() =>
                activeIndex === 3 ? setActiveIndex(0) : setActiveIndex(3)
              }
            >
              жанру
            </div>
            {selectedGenreFilterCount > 0 && (
              <span
                className={styles.selectedGenreFilterCount}
                data-testid="genre-count"
              >
                {selectedGenreFilterCount}
              </span>
            )}
          </>
        )}
      </div>

      {activeIndex === 1 && (
        <FilterItem
          filterName="performer"
          filterContent={performers}
          selectedValues={performerState}
          handleFilterItemClick={handleFilterItemClick}
        />
      )}

      {activeIndex === 2 && (
        <FilterItem
          filterName="year"
          filterContent={years}
          selectedValues={dateState}
          handleFilterItemClick={handleFilterItemClick}
          handleFilterElementClick={handleFilterElementClick}
          isFilterElementClicked={isFilterElementClicked}
        />
      )}

      {activeIndex === 3 && (
        <FilterItem
          filterName="genre"
          filterContent={genres}
          selectedValues={genreState}
          handleFilterItemClick={handleFilterItemClick}
        />
      )}
    </>
  );
}

export default Filter;
