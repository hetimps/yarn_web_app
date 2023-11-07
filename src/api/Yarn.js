
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const prepareHeaders = (headers) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
};

export const YarnApi = createApi({
    reducerPath: 'YarnApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders
    }),
    tagTypes: ["Yarn"],

    endpoints: (builder) => ({

        AddYarn: builder.mutation({
            query: (body) => ({
                url: "/yarn/create-yarn",
                method: 'post',
                body,
            }),
            invalidatesTags: ["Yarn"],
        }),

        GetYarn: builder.query({
            query: ({ page, limit, search}) => ({
                url: '/yarn/getall-yarn',
                params: {
                    page,
                    limit,
                    search,
                },
            }),
            providesTags: ["Yarn"],
        }),
        UpdateYarn: builder.mutation({
            query: ({ body, id }) => ({
                url: '/yarn/update-yarn',
                method: 'PUT',
                params: {
                    id
                },
                body,
            }),
            invalidatesTags: ["Yarn"],
        }),
        GetYarnActivity: builder.query({
            query: (yarn) => ({
                url: '/yarn-activity/getall-yarn-activity',
                params: {
                    yarn
                },
            }),

        }),
    }),
});

export const { useGetYarnQuery, useUpdateYarnMutation, useGetYarnActivityQuery ,useAddYarnMutation} = YarnApi;