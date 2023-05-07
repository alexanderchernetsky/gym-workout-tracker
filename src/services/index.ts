import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {LoginInputs} from '../features/auth/LoginPage';
import {IUserInfo} from '../features/auth/authSlice';

type LoginResponse = {success: boolean; user: IUserInfo};
export const SHARED_LOGIN_KEY = 'shared-login';

export const gymWorkoutTrackerApi = createApi({
    reducerPath: 'gymWorkoutTrackerApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, LoginInputs>({
            query: body => ({
                url: 'login',
                method: 'POST',
                body
            })
        })
    })
});

export const {useLoginMutation} = gymWorkoutTrackerApi;
