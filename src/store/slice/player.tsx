import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSongs: [],
    currentIndex: 0,
    isActive: false,
    isPlaying: false,
    activeSong: {},
    genreListId: '',
    isOpen: false,
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setActiveSong: (state, action) => {
            state.activeSong = action.payload.song;
            if (action.payload?.data?.tracks) {
                state.currentSongs = action.payload.data.tracks;
            }
            state.currentIndex = action.payload.i;
            state.isActive = true;
            state.isPlaying = true;
            state.isOpen = true;
        },

        nextSong: (state: any, action) => {

            if (state.currentSongs[action.payload]?.track) {
                console.log()
                state.activeSong = state.currentSongs[action.payload]?.track;
            } else {
                state.activeSong = state.currentSongs[action.payload];
            }

            state.currentIndex = action.payload;
            state.isActive = true;
            state.isPlaying = true;
        },

        prevSong: (state: any, action) => {

            if (state.currentSongs[action.payload]?.track) {
                state.activeSong = state.currentSongs[action.payload]?.track;
            } else {
                state.activeSong = state.currentSongs[action.payload];
            }

            state.currentIndex = action.payload;
            state.isActive = true;
            state.isPlaying = true;
        },

        playPause: (state, action) => {
            state.isPlaying = action.payload;
        },

        selectGenreListId: (state, action) => {
            state.genreListId = action.payload;
        },
    },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;
