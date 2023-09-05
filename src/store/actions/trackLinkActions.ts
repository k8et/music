// trackSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk for fetching track details
export const fetchTrackDetails = createAsyncThunk(
    'tracks/fetchTrackLink',
    async (trackKey: string, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://shazam-core7.p.rapidapi.com/songs/get_details', {
                params: {
                    id: trackKey,
                },
                headers: {
                    'X-RapidAPI-Key': '85a9970cb2msh8160968b53a049dp15a532jsnb7e972328843',
                    'X-RapidAPI-Host': 'shazam-core7.p.rapidapi.com',
                },
            });

            const trackUri = response.data.hub.actions[1].uri;
            console.log(trackUri)
            if (!trackUri) {
                throw new Error('Track URI not found in response.');
            }

            return trackUri;
        } catch (error) {
        }
    }
);

// Create a slice for tracks
const trackLinkSlice = createSlice({
    name: 'tracksLink',
    initialState: {
        selectedTrackUri: null,
    },
    reducers: {
        setSelectedTrackUri: (state, action) => {
            state.selectedTrackUri = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTrackDetails.fulfilled, (state, action) => {
            state.selectedTrackUri = action.payload;
        });
    },
});

export const { setSelectedTrackUri } = trackLinkSlice.actions;

export default trackLinkSlice.reducer;
