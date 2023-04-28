import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import api from '../../api';
import {LoadingStateType} from '../progress/progressSlice';
import {RegisterFormInputs} from './RegisterPage';
import {LoginInputs} from './index';

export interface IUserInfo {
    // todo: what other info a user should contain?
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

export const loginUser = createAsyncThunk(AuthActions.LOG_IN, async (credentials: LoginInputs) => {
    const response = await api.login(credentials);

    return response.user;
});

export const registerUser = createAsyncThunk(AuthActions.REGISTER, async (registerFormData: RegisterFormInputs) => {
    const response = await api.register(registerFormData);

    return response;
});

// createSlice will auto-generate the action types and action creators for you, based on the names of the reducer functions you provide
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
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
            .addCase(loginUser.pending, () => {
                return {
                    isLoggedIn: false,
                    user: null,
                    loadingState: LoadingStateType.Loading
                };
            })
            .addCase(loginUser.fulfilled, (state: IAuthState, action: PayloadAction<IUserInfo>) => {
                localStorage.setItem('user', JSON.stringify(action.payload));

                return {
                    isLoggedIn: true,
                    user: action.payload,
                    loadingState: LoadingStateType.Success
                };
            })
            .addCase(loginUser.rejected, () => {
                return {
                    isLoggedIn: false,
                    user: null,
                    loadingState: LoadingStateType.Error
                };
            })
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
export const {logOut} = authSlice.actions;

export default authSlice.reducer;
