import {
  addFavorite,
  getAllTracks,
  getFavorite,
  getSelectionById,
  removeFavorite,
} from "@/api/tracksApi";
import { FavoriteRequestProps } from "@/types/FavoriteRequestProps.types";
import { Selection } from "@/types/Selection.types";
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
  isTrackClicked: boolean;
  errorMessage: string;
  selectionIdState: string;
  selectedTracks: Array<Track>;
  selectionName: string;
  listOfTracks: Array<Track>;
  trackCurrentTimeState: number;
  isLoading: boolean;
};

const initialState: TrackStateType = {
  trackState: undefined,
  trackIndexState: -1,
  playingState: false,
  playlistState: [],
  shuffledPlaylistState: [],
  myPlaylistState: [],
  shuffleActiveState: false,
  isTrackClicked: false,
  errorMessage: "",
  selectionIdState: "",
  selectedTracks: [],
  selectionName: "",
  listOfTracks: [],
  trackCurrentTimeState: 0,
  isLoading: true,
};

export const getTracks = createAsyncThunk("track/allTracks", async () => {
  const allTracks = await getAllTracks();
  return allTracks;
});

export const getListOfTracks = createAsyncThunk(
  "track/listTracks",
  async () => {
    const allTracks = await getAllTracks();
    return allTracks;
  }
);

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

export const getSelectedTracks = createAsyncThunk(
  "track/selectedTracks",
  async (selectionId: string) => {
    const selectedTracks = await getSelectionById(selectionId);
    return selectedTracks;
  }
);

const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    setTrackState: (state, action: PayloadAction<Track | undefined>) => {
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
        : state.isTrackClicked
        ? state.playlistState
        : state.listOfTracks;
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
    setisTrackClicked: (state, action: PayloadAction<boolean>) => {
      state.isTrackClicked = action.payload;
    },
    setLike: (state, action: PayloadAction<Track>) => {
      state.myPlaylistState.push(action.payload);
    },
    setDislike: (state, action: PayloadAction<Track>) => {
      state.myPlaylistState = state.myPlaylistState.filter(
        (track) => track._id !== action.payload._id
      );
    },
    setSelectionId: (state, action: PayloadAction<string>) => {
      state.selectionIdState = action.payload;
    },
    setTrackCurrentTime: (state, action: PayloadAction<number>) => {
      state.trackCurrentTimeState = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTracks.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(getTracks.fulfilled, (state, action) => {
        state.playlistState = action.payload;
        state.isLoading = false;
      })
      .addCase(getTracks.rejected, (state, action) => {
        state.errorMessage = "Ошибка: " + action.error.message;
        state.isLoading = false;
      })
      .addCase(getListOfTracks.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(getListOfTracks.fulfilled, (state, action) => {
        state.listOfTracks = action.payload;
        state.isLoading = false;
      })
      .addCase(getListOfTracks.rejected, (state, action) => {
        state.errorMessage = "Ошибка: " + action.error.message;
        state.isLoading = false;
      })
      .addCase(getFavoriteTracks.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(getFavoriteTracks.fulfilled, (state, action) => {
        state.myPlaylistState = action.payload;
        state.isLoading = false;
      })
      .addCase(getFavoriteTracks.rejected, (state, action) => {
        state.errorMessage = "Ошибка: " + action.error.message;
        state.isLoading = false;
      })
      .addCase(getSelectedTracks.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(
        getSelectedTracks.fulfilled,
        (state, action: PayloadAction<Selection>) => {
          state.selectedTracks = state.listOfTracks.filter((track) =>
            action.payload.items.includes(track._id)
          );
          state.selectionName = action.payload.name;
        }
      )
      .addCase(getSelectedTracks.rejected, (state, action) => {
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
  setisTrackClicked,
  setLike,
  setDislike,
  setSelectionId,
  setTrackCurrentTime,
  setIsLoading,
} = trackSlice.actions;
export const trackReducer = trackSlice.reducer;
