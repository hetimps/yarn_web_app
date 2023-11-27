import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';

export const JoinApi = createApi({
    reducerPath: 'JoinApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders
    }),
    endpoints: (builder) => ({
        CheckStatus: builder.query({
            query: () => {
                return {
                    url: '/user/profile'
                };
            },
        }),
    }),
});
export const { useCheckStatusQuery } = JoinApi;
