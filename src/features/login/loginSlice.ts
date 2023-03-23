import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import api from '../../api';
import {LoadingStateType} from '../progress/progressSlice';

export interface IUserInfo {
    // todo: what other info a user should contain?
    name: string;
    id: string;
}

interface ILoginState {
    isLoggedIn: boolean;
    user: IUserInfo | null;
    loadingState: LoadingStateType;
}

const initialState: ILoginState = {
    isLoggedIn: false,
    user: null,
    loadingState: LoadingStateType.Idle
};

export interface ICredentials {
    email: string;
    password: string;
}

enum LoginPageActions {
    LOG_IN = 'LOGIN/LOG_IN'
}

export const loginUser = createAsyncThunk(LoginPageActions.LOG_IN, async (credentials: ICredentials) => {
    const response = await api.login(credentials);

    return response.user;
});

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loginUser.fulfilled, (state: ILoginState, action: PayloadAction<IUserInfo>) => {
                return {
                    isLoggedIn: true,
                    user: action.payload,
                    loadingState: LoadingStateType.Success
                };
            })
            .addCase(loginUser.pending, () => {
                return {
                    isLoggedIn: false,
                    user: null,
                    loadingState: LoadingStateType.Loading
                };
            })
            .addCase(loginUser.rejected, () => {
                return {
                    isLoggedIn: false,
                    user: null,
                    loadingState: LoadingStateType.Error
                };
            });
    }
});

export default loginSlice.reducer;
