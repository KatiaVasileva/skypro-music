import {
  addFavorite,
  FavoriteRequestProps,
  getAllTracks,
  getFavorite,
  removeFavorite,
} from "@/api/tracksApi";
import { Track } from "@/types/Track.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type TrackStateType = {
  trackState?: Track;
  trackIndexState: number;
  playingState: boolean;
  playlistState: Array<Track>;
  shuffledPlaylistState: Array<Track>;
  myPlaylistState: Array<Track>;
  shuffleActiveState: boolean;
  isLiked: boolean;
  isMyPlaylistClicked: boolean;
  errorMessage: string;
};

const initialState: TrackStateType = {
  trackState: undefined,
  trackIndexState: -1,
  playingState: false,
  playlistState: [],
  shuffledPlaylistState: [],
  myPlaylistState: [],
  shuffleActiveState: false,
  isLiked: false,
  isMyPlaylistClicked: false,
  errorMessage: "",
};

export const getTracks = createAsyncThunk("track/allTracks", async () => {
  const allTracks = await getAllTracks();
  return allTracks;
});

export const getFavoriteTracks = createAsyncThunk(
  "track/favorite",
  async ({ access, refresh }: { access: string; refresh: string }) => {
    const myTracks = await getFavorite({ access, refresh });
    return myTracks;
  }
);

export const addTrackInFavorite = createAsyncThunk(
  "track/addFavorite",
  async ({ id, access, refresh }: FavoriteRequestProps) => {
    const likedTrack = await addFavorite({ id, access, refresh });
    return likedTrack;
  }
);

export const removeTrackFromFavorite = createAsyncThunk(
  "track/removeFavorite",
  async ({ id, access, refresh }: FavoriteRequestProps) => {
    const dislikedTrack = await removeFavorite({ id, access, refresh });
    return dislikedTrack;
  }
);

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
    setMyPlaylistState: (state, action: PayloadAction<Array<Track>>) => {
      state.myPlaylistState = action.payload;
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
    toggleIsLiked: (state) => {
      if (state.trackState) {
        state.isLiked = !state.isLiked;
      }
    },
    setIsMyPlaylistClicked: (state, action: PayloadAction<boolean>) => {
      state.isMyPlaylistClicked = action.payload;
    },
    setLike: (state, action: PayloadAction<Track>) => {
      state.myPlaylistState.push(action.payload);
    },
    setDislike: (state, action: PayloadAction<Track>) => {
      state.myPlaylistState = state.myPlaylistState.filter(
        (track) => track._id !== action.payload._id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTracks.fulfilled, (state, action) => {
        state.playlistState = action.payload;
      })
      .addCase(getTracks.rejected, (state, action) => {
        state.errorMessage = "Ошибка: " + action.error.message;
      })
      .addCase(getFavoriteTracks.fulfilled, (state, action) => {
        state.myPlaylistState = action.payload;
      })
      .addCase(getFavoriteTracks.rejected, (state, action) => {
        state.errorMessage = "Ошибка: " + action.error.message;
      });
  },
});

export const {
  setTrackState,
  setTrackIndexState,
  setPlayingState,
  togglePlaying,
  setPlaylistState,
  setMyPlaylistState,
  setNextTrack,
  setPrevTrack,
  setShuffleActiveState,
  toggleShuffle,
  toggleIsLiked,
  setIsMyPlaylistClicked,
} = trackSlice.actions;
export const trackReducer = trackSlice.reducer;
