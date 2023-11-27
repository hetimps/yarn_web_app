import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';

export const AuthApi = createApi({
    reducerPath: 'AuthApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders
    }),
    endpoints: (builder) => ({
        profile: builder.query({
            query: () => {
                return {
                    url: '/user/profile',
                    method: "get",
                };
            },
        }),
    }),
});
export const { useProfileQuery } = AuthApi;
