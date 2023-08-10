import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const prepareHeaders = (headers) => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token)
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
};

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
  }),
});

export const { useAddCompanyMutation} = CompanyApi;





