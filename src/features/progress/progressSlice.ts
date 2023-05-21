import {createSlice} from '@reduxjs/toolkit';

export interface IProgressItem {
    id: string;
    date: string;
    weight: number;
    progressIndicators: string;
    image: string; // base64
}

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
    extraReducers: () => {}
});

// this is for configureStore
export default progressSlice.reducer;
