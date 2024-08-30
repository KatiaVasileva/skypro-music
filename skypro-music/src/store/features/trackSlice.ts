import { Track } from "@/types/Track.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

type TrackStateType = {
  trackState?: Track;
  trackIndexState: number;
  playingState: boolean;
};

const initialState: TrackStateType = {
  trackState: undefined,
  trackIndexState: -1,
  playingState: false,
};

const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    setTrackState: (state, action: PayloadAction<Track>) => {
      state.trackState = action.payload;
    },
    setTrackIndexState: (state, action: PayloadAction<number>) => {
      state.trackIndexState = action.payload;
    },
    setPlayingState: (state, action: PayloadAction<boolean>) => {
      state.playingState = action.payload;
    },
    togglePlaying: (state) => {
      state.playingState = !state.playingState;
    }
  },
});

export const { setTrackState, setTrackIndexState, setPlayingState, togglePlaying } = trackSlice.actions;
export const trackReducer = trackSlice.reducer;