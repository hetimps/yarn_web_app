import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const LoginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: '/user/login',
        method: 'post',
        body,
      }),

    }),
  }),
});

export const { useLoginUserMutation } = LoginApi;





