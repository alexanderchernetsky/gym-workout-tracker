import {configureStore} from '@reduxjs/toolkit';

import progressReducer from './features/progress/progressSlice';
import authReducer from './features/auth/authSlice';
import {gymWorkoutTrackerApi} from './services';

const store = configureStore({
    reducer: {
        [gymWorkoutTrackerApi.reducerPath]: gymWorkoutTrackerApi.reducer,
        auth: authReducer,
        progress: progressReducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(gymWorkoutTrackerApi.middleware)
});

export default store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
