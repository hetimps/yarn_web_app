
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const prepareHeaders = (headers) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
};
export const QualityApi = createApi({
    reducerPath: 'QualityApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders
    }),
    endpoints: (builder) => ({
        GetQuality: builder.query({
            query: ({ page, limit, search }) => ({

                url: '/quality/getall-quality',
                params: {
                    page,
                    limit,
                    search
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

        AddYarn: builder.mutation({
            query: (body) => ({
                url: "/yarn/create-yarn",
                method: 'post',
                body,
            }),
            invalidatesTags: ["Yarn"],
        }),

        GetYarn: builder.query({
            query: () => ({
                url: '/yarn/getall-yarn',
            }),
            providesTags: ["Yarn"],
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
            query: () => ({
                url: '/yarn/getall-yarn',
            }),

        }),
    }),
});

export const { useGetQualityQuery, useAddQualityMutation, useAddYarnMutation, useGetYarnQuery, useGetCompanyQuery, useAddCompanyMutation } = QualityApi;