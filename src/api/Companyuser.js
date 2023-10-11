
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const prepareHeaders = (headers) => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
};

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

        // AcceptedCompanyUser: builder.mutation({
        //     query: (e) => {
        //         console.log('AcceptedCompanyUser body:', e); // Log the body parameter
        //         return {
        //             url: "/company-user/req-accepted",
        //             method: 'post',
        //             params: e.acceptedUserId,
        //             body: e.body
        //         };
        //     },
        //     invalidatesTags: ["CompanyUser"],
        // }),

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