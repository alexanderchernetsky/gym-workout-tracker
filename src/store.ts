import {configureStore} from '@reduxjs/toolkit';

import progressReducer from './features/progress/progressSlice';
import authReducer from './features/login/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        progress: progressReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
