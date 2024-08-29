import { Track } from "@/types/Track.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType = {
    playlistState: Array<Track>;
};

const initialState: PlaylistStateType = {
    playlistState: [],
};

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setPlaylistState: (state, action: PayloadAction<Array<Track>>) => {
            state.playlistState = action.payload;
        },
    },
});

export const {setPlaylistState} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;