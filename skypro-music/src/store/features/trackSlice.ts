import {
  addFavorite,
  getAllTracks,
  getFavorite,
  getSelectionById,
  getSelections,
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
  isMyPlaylistClicked: boolean;
  isSelectionClicked: boolean;
  isSelectedTrackClicked: boolean;
  errorMessage: string;
  selectionState?: Selection;
  allSelectionsState: Array<Selection>;
  selectionIdState: number;
  selectedTracks: Array<Track>;
  listOfTracks: Array<Track>;
};

const initialState: TrackStateType = {
  trackState: undefined,
  trackIndexState: -1,
  playingState: false,
  playlistState: [],
  shuffledPlaylistState: [],
  myPlaylistState: [],
  shuffleActiveState: false,
  isMyPlaylistClicked: false,
  isSelectionClicked: false,
  isSelectedTrackClicked: false,
  errorMessage: "",
  selectionState: undefined,
  allSelectionsState: [],
  selectionIdState: -1,
  selectedTracks: [],
  listOfTracks: [],
};

export const getTracks = createAsyncThunk("track/allTracks", async () => {
  const allTracks = await getAllTracks();
  return allTracks;
});

export const getListOfTracks = createAsyncThunk("track/listTracks", async () => {
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

export const getAllSelections = createAsyncThunk(
  "track/selections",
  async () => {
    const allSelections = await getSelections();
    return allSelections;
  }
);

export const getSelectedTracks = createAsyncThunk(
  "track/selectedTracks",
  async (selectionId: number) => {
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
    setIsMyPlaylistClicked: (state, action: PayloadAction<boolean>) => {
      state.isMyPlaylistClicked = action.payload;
    },
    setIsSelectionClicked: (state, action: PayloadAction<boolean>) => {
      state.isSelectionClicked = action.payload;
    },
    setIsSelectedTrackClicked: (state, action: PayloadAction<boolean>) => {
      state.isSelectedTrackClicked = action.payload;
    },
    setLike: (state, action: PayloadAction<Track>) => {
      state.myPlaylistState.push(action.payload);
    },
    setDislike: (state, action: PayloadAction<Track>) => {
      state.myPlaylistState = state.myPlaylistState.filter(
        (track) => track._id !== action.payload._id
      );
    },
    setSelectionId: (state, action: PayloadAction<number>) => {
      state.selectionIdState = action.payload;
    },
    setSelectedTracks: (state, action: PayloadAction<Selection>) => {
      state.selectedTracks = action.payload.items.map(el => state.listOfTracks.filter(elem => elem._id === el)).flat();
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
      .addCase(getListOfTracks.fulfilled, (state, action) => {
        state.listOfTracks = action.payload;
      })
      .addCase(getListOfTracks.rejected, (state, action) => {
        state.errorMessage = "Ошибка: " + action.error.message;
      })
      .addCase(getFavoriteTracks.fulfilled, (state, action) => {
        state.myPlaylistState = action.payload;
      })
      .addCase(getFavoriteTracks.rejected, (state, action) => {
        state.errorMessage = "Ошибка: " + action.error.message;
      })
      .addCase(getAllSelections.fulfilled, (state, action) => {
        state.allSelectionsState = action.payload;
      })
      .addCase(getAllSelections.rejected, (state, action) => {
        state.errorMessage = "Ошибка: " + action.error.message;
      })
      .addCase(getSelectedTracks.fulfilled, (state, action) => {
        state.selectionState = action.payload;
      })
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
  setIsMyPlaylistClicked,
  setIsSelectionClicked,
  setIsSelectedTrackClicked,
  setLike,
  setDislike,
  setSelectionId,
  setSelectedTracks,
} = trackSlice.actions;
export const trackReducer = trackSlice.reducer;
