import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import api from '../../mock-api';

enum ProgressPageActions {
    ADD_NEW_PROGRESS_ITEM = 'PROGRESS/ADD_NEW_PROGRESS_ITEM'
}

export interface IProgressItem {
    id: string;
    date: string;
    weight: number;
    progressIndicators: string;
    image: string; // base64
}

export const addNewProgressItem = createAsyncThunk(ProgressPageActions.ADD_NEW_PROGRESS_ITEM, async (data: IProgressItem) => {
    const response = await api.addNewProgressItem(data);

    return response.data;
});

export enum LoadingStateType {
    Idle = 'idle',
    Loading = 'loading',
    Error = 'error',
    Success = 'success'
}

interface IProgressFeatureState {
    loadingState: LoadingStateType;
    progressItems: IProgressItem[];
}

const initialState: IProgressFeatureState = {
    loadingState: LoadingStateType.Idle,
    progressItems: []
};

export const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // ADD
            .addCase(addNewProgressItem.fulfilled, (state, action) => {
                return {
                    loadingState: LoadingStateType.Success,
                    progressItems: [action.payload, ...state.progressItems]
                };
            })
            .addCase(addNewProgressItem.pending, state => {
                return {
                    ...state,
                    loadingState: LoadingStateType.Loading
                };
            })
            .addCase(addNewProgressItem.rejected, state => {
                return {
                    ...state,
                    loadingState: LoadingStateType.Error
                };
            });
    }
});

// this is for configureStore
export default progressSlice.reducer;
