import {createSlice} from '@reduxjs/toolkit';

export interface IUserInfo {
    id: string;
    name: string;
    email: string;
}

interface IAuthState {
    isLoggedIn: boolean;
    user: IUserInfo | null;
}

const initialState: IAuthState = {
    isLoggedIn: false,
    user: null
};

// createSlice will auto-generate the action types and action creators for you, based on the names of the reducer functions you provide
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));

            return {
                isLoggedIn: true,
                user: action.payload
            };
        },

        logOut: state => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');

            return {
                isLoggedIn: false,
                user: null
            };
        }
    }
});

// Extract and export each action creator by name
export const {login, logOut} = authSlice.actions;

export default authSlice.reducer;
