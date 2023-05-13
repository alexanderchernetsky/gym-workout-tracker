import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {LoginInputs} from '../features/auth/LoginPage';
import {IUserInfo} from '../features/auth/authSlice';
import {RegisterFormInputs} from '../features/auth/RegisterPage';
import {IProgressItem} from '../features/progress/progressSlice';

const gymWorkoutTrackerApiUrl = process.env.REACT_APP_API;
// 'http://localhost:3001'
// process.env.REACT_APP_API

type LoginResponse = {success: boolean; user: IUserInfo};

export const SHARED_LOGIN_KEY = 'shared-login';

interface IApiResponse {
    success: boolean;
}

interface IRegisterResponse extends IApiResponse {}

interface IDeleteProgressEntryResponse extends IApiResponse {}

enum API_ROUTES {
    LOGIN = 'login',
    REGISTER = 'register',
    PROGRESS_ENTRIES = 'progress-entries',
    PROGRESS_ENTRY = 'progress-entry'
}

enum HTTP_METHODS {
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE'
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

        register: builder.mutation<IRegisterResponse, RegisterFormInputs>({
            query: body => ({
                url: API_ROUTES.REGISTER,
                method: HTTP_METHODS.POST,
                body
            })
        }),

        fetchProgressEntries: builder.query<IProgressItem[], void>({
            query: () => ({
                url: API_ROUTES.PROGRESS_ENTRIES,
                method: HTTP_METHODS.GET
            }),
            transformResponse: (response: {data: IProgressItem[]}) => response.data
        }),

        deleteProgressEntry: builder.mutation<IDeleteProgressEntryResponse, string>({
            query: () => ({
                url: API_ROUTES.PROGRESS_ENTRY,
                method: HTTP_METHODS.DELETE
            })
        })
    })
});

export const {useLoginMutation, useRegisterMutation, useFetchProgressEntriesQuery, useDeleteProgressEntryMutation} = gymWorkoutTrackerApi;
