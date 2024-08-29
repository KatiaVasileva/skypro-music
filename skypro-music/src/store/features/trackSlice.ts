import { Track } from "@/types/Track.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TrackStateType = {
  trackState?: Track;
  trackIndexState: number;
};

const initialState: TrackStateType = {
  trackState: undefined,
  trackIndexState: -1,
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
    }
  },
});

export const { setTrackState, setTrackIndexState } = trackSlice.actions;
export const trackReducer = trackSlice.reducer;