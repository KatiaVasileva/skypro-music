import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterStateType = {
  searchState: string;
  performerState: Array<string>;
  dateState: Array<string>;
  genreState: Array<string>;
};

const initialState: FilterStateType = {
  searchState: "",
  performerState: [],
  dateState: [],
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
      const dateOrder = action.payload;
      if (state.dateState.includes(dateOrder)) {
        state.dateState = state.dateState.filter((d) => d !== dateOrder);
      } else {
        state.dateState[0] = dateOrder;
      }
    //   state.dateState[0] = dateOrder;
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
      state.dateState = [];
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
