import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlayingStateType = {
  playingState: boolean;
};

const initialState: PlayingStateType = {
  playingState: false,
};

const playingSlice = createSlice({
  name: "playing",
  initialState,
  reducers: {
    setPlayingState: (state, action: PayloadAction<boolean>) => {
      state.playingState = action.payload;
    },
    togglePlaying: (state) => {
      state.playingState = !state.playingState;
    },
  },
});

export const { setPlayingState, togglePlaying } = playingSlice.actions;
export const playingReducer = playingSlice.reducer;
