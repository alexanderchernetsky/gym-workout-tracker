import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import api from '../../mock-api';
import {LoadingStateType} from '../progress/progressSlice';
import {RegisterFormInputs} from './RegisterPage';

export interface IUserInfo {
    name: string;
    id: string;
}

interface IAuthState {
    isLoggedIn: boolean;
    user: IUserInfo | null;
    loadingState: LoadingStateType;
}

const initialState: IAuthState = {
    isLoggedIn: false,
    user: null,
    loadingState: LoadingStateType.Idle
};

enum AuthActions {
    LOG_IN = 'AUTH/LOG_IN',
    LOG_OUT = 'AUTH/LOG_OUT',
    REGISTER = 'AUTH/REGISTER'
}

// todo: re-write the below using RTK Query
export const registerUser = createAsyncThunk(AuthActions.REGISTER, async (registerFormData: RegisterFormInputs) => {
    const response = await api.register(registerFormData);

    return response;
});

// createSlice will auto-generate the action types and action creators for you, based on the names of the reducer functions you provide
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));

            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            };
        },

        logOut: state => {
            localStorage.removeItem('user');

            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                return {
                    ...state,
                    loadingState: LoadingStateType.Loading
                };
            })
            .addCase(registerUser.fulfilled, state => {
                return {
                    ...state,
                    loadingState: LoadingStateType.Success
                };
            })
            .addCase(registerUser.rejected, state => {
                return {
                    ...state,
                    loadingState: LoadingStateType.Error
                };
            });
    }
});

// Extract and export each action creator by name
export const {login, logOut} = authSlice.actions;

export default authSlice.reducer;
