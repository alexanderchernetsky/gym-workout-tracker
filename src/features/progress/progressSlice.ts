import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import api from "../../api";
import {ProgressItem} from "../../data/progressItems";


enum ProgressPageActions {
    GET_PROGRESS_ITEMS = 'GET_PROGRESS_ITEMS'
}

export const getProgressItems = createAsyncThunk(
    ProgressPageActions.GET_PROGRESS_ITEMS,
    async () => {
        const response = await api.fetchProgressItems();

        return response;
    }
)

export const progressSlice = createSlice({
    name: 'progress',
    initialState: [],
    reducers: {
        setProgressItems: (state, action) => {
          return action.payload;
        },
        addProgressItem: (state, action) => {
            return [...state, action.payload]
        },
    },
    extraReducers: (builder) => {
        // todo: handle loading and error states
        builder.addCase(getProgressItems.fulfilled, (state, action) => {
            return action.payload as ProgressItem[];
        })
    }
});

// this is for dispatch
export const { addProgressItem } = progressSlice.actions;

// this is for configureStore
export default progressSlice.reducer;
