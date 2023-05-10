import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import api from '../../mock-api';

enum ProgressPageActions {
    GET_PROGRESS_ITEMS = 'PROGRESS/GET_PROGRESS_ITEMS',
    DELETE_PROGRESS_ITEM = 'PROGRESS/DELETE_PROGRESS_ITEM',
    ADD_NEW_PROGRESS_ITEM = 'PROGRESS/ADD_NEW_PROGRESS_ITEM'
}

export const deleteProgressItem = createAsyncThunk(ProgressPageActions.DELETE_PROGRESS_ITEM, async (id: string) => {
    await api.deleteProgressItem(id);

    return id;
});

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
        // GET
        builder
            // DELETE
            .addCase(deleteProgressItem.rejected, (state, action) => {
                return {
                    loadingState: LoadingStateType.Error,
                    progressItems: state.progressItems
                };
            })
            .addCase(deleteProgressItem.pending, (state, action) => {
                return {
                    ...state,
                    loadingState: LoadingStateType.Loading
                };
            })
            .addCase(deleteProgressItem.fulfilled, (state, action) => {
                return {
                    loadingState: LoadingStateType.Success,
                    progressItems: state.progressItems.filter(item => item.id !== action.payload)
                };
            })
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
