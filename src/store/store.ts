import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import tracksReducer from './actions/trackActions';
const store = configureStore({
    reducer: {
        tracks: tracksReducer,
    },
});

export default store;

// Определите тип RootState, представляющий состояние вашего хранилища
export type RootState = ReturnType<typeof store.getState>;

// Определите тип AppDispatch, используя ThunkAction из Redux Toolkit
export type AppDispatch = typeof store.dispatch;

// Теперь вы можете использовать AppDispatch для диспетчера в ваших компонентах
