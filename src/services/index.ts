import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {LoginInputs} from '../features/auth/LoginPage';
import {IUserInfo} from '../features/auth/authSlice';
import {RegisterFormInputs} from '../features/auth/RegisterPage';

const gymWorkoutTrackerApiUrl = 'http://localhost:3001';
// 'http://localhost:3001'

type LoginResponse = {success: boolean; user: IUserInfo};

export const SHARED_LOGIN_KEY = 'shared-login';

type RegisterResponse = {
    success: boolean;
};

enum API_ROUTES {
    LOGIN = 'login',
    REGISTER = 'register'
}

enum HTTP_METHODS {
    POST = 'POST'
}

export const gymWorkoutTrackerApi = createApi({
    reducerPath: 'gymWorkoutTrackerApi',
    baseQuery: fetchBaseQuery({baseUrl: gymWorkoutTrackerApiUrl}),
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, LoginInputs>({
            query: body => ({
                url: API_ROUTES.LOGIN,
                method: HTTP_METHODS.POST,
                body
            })
        }),

        register: builder.mutation<RegisterResponse, RegisterFormInputs>({
            query: body => ({
                url: API_ROUTES.REGISTER,
                method: HTTP_METHODS.POST,
                body
            })
        })
    })
});

export const {useLoginMutation, useRegisterMutation} = gymWorkoutTrackerApi;
