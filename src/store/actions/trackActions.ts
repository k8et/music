import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


export const getTopCharts = createAsyncThunk('tracks/getTopCharts', async () => {
    try {
        const response = await axios.get('URL_ДЛЯ_ТОП_ЧАРТОВ');
        return response.data.tracks;
    } catch (error) {
        throw error;
    }
});

export const getSongsByGenre = createAsyncThunk('tracks/getSongsByGenre', async (genre: string) => {
    try {
        const response = await axios.get('https://shazam-core7.p.rapidapi.com/charts/get-top-songs-in_world_by_genre', {
            params: {
                genre: genre,
                limit: '9'
            },
            headers: {
                'X-RapidAPI-Key': '85a9970cb2msh8160968b53a049dp15a532jsnb7e972328843',
                'X-RapidAPI-Host': 'shazam-core7.p.rapidapi.com'
            }
        });
        return response.data.tracks;
    } catch (error) {
        throw error;
    }
});

export const getSongsByCountry = createAsyncThunk('tracks/getSongsByCountry', async (country: string) => {
    try {
        const response = await axios.get('URL_ДЛЯ_ПЕСЕН_ПО_СТРАНЕ', {
            params: {
                country,
                limit: '10'
            },
        });
        return response.data.tracks;
    } catch (error) {
        throw error;
    }
});

export const getSongsBySearch = createAsyncThunk('tracks/getSongsBySearch', async (searchTerm: string) => {
    try {
        const response = await axios.get('URL_ДЛЯ_ПЕСЕН_ПО_ПОИСКУ', {
            params: {
                term: searchTerm,
                limit: '10'
            },
        });
        return response.data.tracks;
    } catch (error) {
        throw error;
    }
});

export const getArtistDetails = createAsyncThunk('artists/getArtistDetails', async (artistId: string) => {
    try {
        const response = await axios.get(`URL_ДЛЯ_ИНФОРМАЦИИ_О_ИСПОЛНИТЕЛЕ/${artistId}`);
        return response.data.artist;
    } catch (error) {
        throw error;
    }
});

export const getSongDetails = createAsyncThunk('tracks/getSongDetails', async (songId: string) => {
    try {
        const response = await axios.get(`URL_ДЛЯ_ИНФОРМАЦИИ_О_ПЕСНЕ/${songId}`);
        return response.data.song;
    } catch (error) {
        throw error;
    }
});

export const getSongRelated = createAsyncThunk('tracks/getSongRelated', async (songId: string) => {
    try {
        const response = await axios.get(`URL_ДЛЯ_СВЯЗАННЫХ_ПЕСЕН/${songId}`);
        return response.data.relatedSongs;
    } catch (error) {
        throw error;
    }
});

const tracksSlice = createSlice({
    name: 'tracks',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTopCharts.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getSongsByGenre.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getSongsByCountry.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getSongsBySearch.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getArtistDetails.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getSongDetails.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getSongRelated.fulfilled, (state, action) => {
                return action.payload;
            });
    },
});

export default tracksSlice.reducer;
