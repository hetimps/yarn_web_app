
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const prepareHeaders = (headers) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
};
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
