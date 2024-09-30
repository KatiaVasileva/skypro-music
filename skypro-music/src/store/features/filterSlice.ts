import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterStateType = {
  searchState: string;
  performerState: Array<string>;
  dateState: string;
  genreState: Array<string>;
};

const initialState: FilterStateType = {
  searchState: "",
  performerState: [],
  dateState: "",
  genreState: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchState: (state, action: PayloadAction<string>) => {
      state.searchState = action.payload;
    },
    setPerformerState: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      if (state.performerState.includes(author)) {
        state.performerState = state.performerState.filter(
          (performer) => performer !== author
        );
      } else {
        state.performerState.push(author);
      }
    },
    setDateState: (state, action: PayloadAction<string>) => {
      state.dateState = action.payload;
    },
    setGenreState: (state, action: PayloadAction<string>) => {
      const genre = action.payload;
      if (state.genreState.includes(genre)) {
        state.genreState = state.genreState.filter((g) => g !== genre);
      } else {
        state.genreState.push(genre);
      }
    },
    resetFilters: (state) => {
      state.searchState = "";
      state.performerState = [];
      state.dateState = "По умолчанию";
      state.genreState = [];
    },
  },
});

export const {
  setSearchState,
  setPerformerState,
  setDateState,
  setGenreState,
  resetFilters,
} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
