import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';

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