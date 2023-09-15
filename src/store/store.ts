import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { myApi } from './actions/trackActions';

const store = configureStore({
    reducer: {
        [myApi.reducerPath]: myApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(myApi.middleware),
});

setupListeners(store.dispatch);

export default store;
