import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import api from '../../api';
import {ProgressItem} from '../../mock-data/progressItems';

enum ProgressPageActions {
    GET_PROGRESS_ITEMS = 'PROGRESS/GET_PROGRESS_ITEMS',
    DELETE_PROGRESS_ITEM = 'DELETE_PROGRESS_ITEM'
}

export const getProgressItems = createAsyncThunk(ProgressPageActions.GET_PROGRESS_ITEMS, async () => {
    const response = await api.fetchProgressItems();

    return response;
});

export const deleteProgressItem = createAsyncThunk(ProgressPageActions.DELETE_PROGRESS_ITEM, async (id: number) => {
    await api.deleteProgressItem(id);

    return id;
});

export enum LoadingStateType {
    Idle = 'idle',
    Loading = 'loading',
    Error = 'error',
    Success = 'success'
}

interface IProgressFeatureState {
    loadingState: LoadingStateType;
    progressItems: ProgressItem[];
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
        // todo: handle loading and error states
        builder
            .addCase(getProgressItems.fulfilled, (state: IProgressFeatureState, action) => {
                return {
                    loadingState: LoadingStateType.Success,
                    progressItems: action.payload as ProgressItem[]
                };
            })
            .addCase(getProgressItems.rejected, (state, action) => {
                return {
                    loadingState: LoadingStateType.Error,
                    progressItems: []
                };
            })
            .addCase(getProgressItems.pending, (state, action) => {
                return {
                    loadingState: LoadingStateType.Loading,
                    progressItems: []
                };
            })
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
            });
    }
});

// this is for configureStore
export default progressSlice.reducer;
