import {createApi} from '@reduxjs/toolkit/query/react';
import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

import {HTTP_METHODS} from './httpMethods';

const ninjasApiUrl = process.env.REACT_APP_NINJAS_API_URL;
const ninjasApiKey = process.env.REACT_APP_NINJAS_API_KEY;

export interface IExercise {
    difficulty: string;
    equipment: string;
    instructions: string;
    muscle: string;
    name: string;
    type: string;
}

export const ninjasApi = createApi({
    reducerPath: 'ninjasApi',
    baseQuery: fetchBaseQuery({
        baseUrl: ninjasApiUrl,
        prepareHeaders: headers => {
            headers.set('X-Api-Key', ninjasApiKey);
            return headers;
        }
    }),
    tagTypes: [],
    endpoints: builder => ({
        fetchExercises: builder.query<IExercise[], string>({
            query: searchString => ({
                url: `/exercises?${searchString}`,
                method: HTTP_METHODS.GET
            })
        })
    })
});

export const {useFetchExercisesQuery} = ninjasApi;
