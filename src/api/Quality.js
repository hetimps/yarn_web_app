import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';

export const QualityApi = createApi({
    reducerPath: 'QualityApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders
    }),
    tagTypes: ["Quality", "Yarn", "Company"],
    endpoints: (builder) => ({
        GetQuality: builder.query({
            query: ({ page, limit, search, yarn }) => ({
                url: '/quality/getall-quality',
                params: {
                    page,
                    limit,
                    search,
                    yarn
                },
            }),
            providesTags: ["Quality"],
        }),
        AddQuality: builder.mutation({
            query: (body) => ({
                url: "/quality/create-quality",
                method: 'post',
                body,
            }),
            invalidatesTags: ["Quality"],
        }),
        GetCompany: builder.query({
            query: () => ({
                url: '/yarn-company/getall-yarn-company',
            }),
            providesTags: ["Company"],
        }),

        AddCompany: builder.mutation({
            query: (body) => ({
                url: "/yarn-company/create-yarn-company",
                method: 'post',
                body,
            }),
            invalidatesTags: ["Company"],
        }),
        GetEditQuality: builder.query({
            query: (id) => ({
                url: '/quality/get-quality',
                params: {
                    id
                },
            }),
        }),
        EditQuality: builder.mutation({
            query: ({ body, id }) => ({
                url: '/quality/update-quality',
                method: 'PUT',
                params: {
                    id
                },
                body,
            }),
        }),
        DeleteQuality: builder.mutation({
            query: ({ id }) => ({
                url: "/quality/delete-quality",
                method: 'DELETE',
                params: {
                    id
                },
            }),
            invalidatesTags: ["Quality"]
        })
    }),
});

export const { useDeleteQualityMutation, useEditQualityMutation, useGetQualityQuery, useAddQualityMutation, useAddYarnMutation, useGetYarnQuery, useGetCompanyQuery, useAddCompanyMutation, useGetEditQualityQuery } = QualityApi;