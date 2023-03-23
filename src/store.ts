import {configureStore} from '@reduxjs/toolkit';

import progressReducer from './features/progress/progressSlice';
import loginReducer from './features/login/loginSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        progress: progressReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
