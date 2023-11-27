import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';

export const CompanyApi = createApi({
  reducerPath: 'CompanyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: prepareHeaders
  }),
  endpoints: (builder) => ({
    AddCompany: builder.mutation({
      query: (body) => ({
        url: '/company/create-company',
        method: 'post',
        body,
      }),
    }),
    JoinCompany : builder.mutation({
      query:(body)=>({
        url: '/company/join-company',
        method: 'post',
        body,
      })
    })
  }),
});

export const { useAddCompanyMutation,useJoinCompanyMutation} = CompanyApi;





