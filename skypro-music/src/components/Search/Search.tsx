"use client"

import { useAppDispatch, useAppSelector } from "@/store/store";
import Icon from "../Icon/Icon";
import styles from "./Search.module.css";
import { setSearchState } from "@/store/features/filterSlice";
import { ChangeEventHandler } from "react";

function Search() {
  const { searchState } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(setSearchState(event.target.value));
  };

  return (
    <div className={styles.search}>
      <Icon iconClass={styles.searchSvg} name="icon-search" />
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchState}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default Search;
