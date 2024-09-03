import { Track } from "@/types/Track.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TrackStateType = {
  trackState?: Track;
  trackIndexState: number;
  playingState: boolean;
  playlistState: Array<Track>;
  shuffleActiveState: boolean;
};

const initialState: TrackStateType = {
  trackState: undefined,
  trackIndexState: -1,
  playingState: false,
  playlistState: [],
  shuffleActiveState: false,
};

const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    setTrackState: (state, action: PayloadAction<Track>) => {
      state.trackState = action.payload;
    },
    setPlaylistState: (state, action: PayloadAction<Array<Track>>) => {
      state.playlistState = action.payload;
    },
    setTrackIndexState: (state, action: PayloadAction<number>) => {
      state.trackIndexState = action.payload;
    },
    setPlayingState: (state, action: PayloadAction<boolean>) => {
      state.playingState = action.payload;
    },
    setShuffleActiveState: (state, action: PayloadAction<boolean>) => {
      state.shuffleActiveState = action.payload;
    },
    togglePlaying: (state) => {
      state.playingState = !state.playingState;
    },
    toggleShuffle: (state) => {
      state.shuffleActiveState = !state.shuffleActiveState;
    },
    setNextTrack: (state) => {
      const playlist = state.playlistState;
      const nextIndex = state.shuffleActiveState
        ? Math.floor(Math.random() * playlist.length)
        : state.trackIndexState < playlist.length - 1
        ? state.trackIndexState + 1
        : 0;
      state.trackIndexState = nextIndex;
      state.trackState = playlist[nextIndex]; 
    },
    setPrevTrack: (state) => {
      const playlist = state.playlistState;
      const nextIndex = state.shuffleActiveState
      ? Math.floor(Math.random() * playlist.length)
      : state.trackIndexState > 0
      ? state.trackIndexState - 1
      : 0;
      state.trackIndexState = nextIndex;
      state.trackState = playlist[nextIndex]; 
    },
  },
});

export const {
  setTrackState,
  setTrackIndexState,
  setPlayingState,
  togglePlaying,
  setPlaylistState,
  setNextTrack,
  setPrevTrack,
  setShuffleActiveState,
  toggleShuffle,
} = trackSlice.actions;
export const trackReducer = trackSlice.reducer;
