import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';

export const CompanyUser = createApi({
    reducerPath: 'CompanyUser',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: prepareHeaders
    }),
    tagTypes: ["CompanyUser"],
    endpoints: (builder) => ({
        GetCompanyUser: builder.query({
            query: ({ status, page, search }) => ({
                url: '/company-user/getall-company-user',
                params: {
                    status,
                    page,
                    search
                },
            }),
            providesTags: ["CompanyUser"],
        }),
        RejectedCompanyUser: builder.mutation({
            query: (id) => ({
                url: "/company-user/rejected",
                method: 'post',
                params: {
                    id,
                },
            }),
            invalidatesTags: ["CompanyUser"],
        }),
        AcceptedCompanyUser: builder.mutation({
            query: (e) => {
                console.log('AcceptedCompanyUser body:', e);
                const query = {
                    url: "/company-user/req-accepted",
                    method: 'post',
                    params: {},
                    body: {}
                };
                if (e?.acceptedUserId) { query.params.id = e.acceptedUserId }
                if (e?.body) { query.body = e.body }
                return query;
            },
            invalidatesTags: ["CompanyUser"],
        }),
    }),
});

export const { useGetCompanyUserQuery, useRejectedCompanyUserMutation, useAcceptedCompanyUserMutation } = CompanyUser;