import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: "",
  isOpen: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
      console.log(state.activeSong,"state.activeSong")
      if (action.payload?.data?.artist) {
        state.currentSongs = action.payload.data.tracks?.hits;
      } else if (action.payload?.data) {
        state.currentSongs =
          action.payload.data.tracks ||
          action.payload.data.data ||
          action.payload.data;
      }
      state.currentIndex = action.payload.i;
      state.isActive = true;
      state.isPlaying = true;
      state.isOpen = true;
    },

    nextSong: (state: any, action) => {
      if (state.currentSongs[action.payload]?.track) {
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
      state.isActive = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause } =
  playerSlice.actions;

export default playerSlice.reducer;
