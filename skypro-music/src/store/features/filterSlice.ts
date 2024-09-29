import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FilterStateType = {
  searchState: string;
};

const initialState: FilterStateType = {
  searchState: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchState: (state, action: PayloadAction<string>) => {
      state.searchState = action.payload;
    },
  },
});

export const { setSearchState } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
