import { Track } from "@/types/Track.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TrackStateType = {
  trackState?: Track;
};

const initialState: TrackStateType = {
  trackState: undefined,
};

const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    setTrackState: (state, action: PayloadAction<Track>) => {
      state.trackState = action.payload;
    },
  },
});

export const { setTrackState } = trackSlice.actions;
export const trackReducer = trackSlice.reducer;