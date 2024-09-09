import { Track } from "@/types/Track.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TrackStateType = {
  trackState?: Track;
  trackIndexState: number;
  playingState: boolean;
  playlistState: Array<Track>;
  shuffledPlaylistState: Array<Track>;
  shuffleActiveState: boolean;
};

const initialState: TrackStateType = {
  trackState: undefined,
  trackIndexState: -1,
  playingState: false,
  playlistState: [],
  shuffledPlaylistState: [],
  shuffleActiveState: false,
};

const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    setTrackState: (state, action: PayloadAction<Track>) => {
      state.trackState = action.payload;
    },
    setPlaylistState: (
      state,
      action: PayloadAction<{ tracks: Array<Track> }>
    ) => {
      if (state.shuffleActiveState) {
        state.shuffledPlaylistState = [...action.payload.tracks].sort(
          () => 0.5 - Math.random()
        );
      } else {
        state.playlistState = action.payload.tracks;
      }
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
      const playlist = state.shuffleActiveState
        ? state.shuffledPlaylistState
        : state.playlistState;
      const nextIndex =
        state.trackIndexState < playlist.length - 1
          ? state.trackIndexState + 1
          : 0;
      state.trackIndexState = nextIndex;
      state.trackState = playlist[nextIndex];
    },
    setPrevTrack: (state) => {
      const playlist = state.shuffleActiveState
        ? state.shuffledPlaylistState
        : state.playlistState;
      const nextIndex =
        state.trackIndexState > 0 ? state.trackIndexState - 1 : 0;
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
