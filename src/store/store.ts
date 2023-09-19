import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { myApi } from './actions/trackActions';
import playerReducer from './slice/player';

const store = configureStore({
    reducer: {
        [myApi.reducerPath]: myApi.reducer,
        player: playerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(myApi.middleware),
});

setupListeners(store.dispatch);

export default store;
