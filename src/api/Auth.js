import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const prepareHeaders = (headers) => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token)
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
};

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
