
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const prepareHeaders = (headers) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
};

export const ProfileApi = createApi({
    reducerPath: 'ProfileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders
    }),
    tagTypes: ["Profile"],

    endpoints: (builder) => ({
        UpdateProfile: builder.mutation({
            query: (body) => ({
                url: "/user/add-name-email",
                method: 'post',
                body,
            }),
        }),
    }),
    
});

export const { useUpdateProfileMutation } = ProfileApi;