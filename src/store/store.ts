import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { myApi } from './actions/trackActions';
import playerReducer from './slice/player';
import {myApiCountry} from "./actions/trackCountryActions";

const store = configureStore({
    reducer: {
        [myApiCountry.reducerPath]: myApiCountry.reducer,
        [myApi.reducerPath]: myApi.reducer,
        player: playerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(myApi.middleware),
});

setupListeners(store.dispatch);

export default store;
