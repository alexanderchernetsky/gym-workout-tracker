import { configureStore } from '@reduxjs/toolkit';

import progressReducer from './features/progress/progressSlice';

const store = configureStore({
    reducer: {
        progress: progressReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
