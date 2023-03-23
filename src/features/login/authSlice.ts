import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import api from '../../api';
import {LoadingStateType} from '../progress/progressSlice';

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

export interface ICredentials {
    email: string;
    password: string;
}

enum LoginPageActions {
    LOG_IN = 'AUTH/LOG_IN',
    LOG_OUT = 'AUTH/LOG_OUT'
}

export const loginUser = createAsyncThunk(LoginPageActions.LOG_IN, async (credentials: ICredentials) => {
    const response = await api.login(credentials);

    return response.user;
});

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
            .addCase(loginUser.fulfilled, (state: IAuthState, action: PayloadAction<IUserInfo>) => {
                localStorage.setItem('user', JSON.stringify(action.payload));

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

// Extract the action creators object
const {actions} = authSlice;
// Extract and export each action creator by name
export const {logOut} = actions;

export default authSlice.reducer;
