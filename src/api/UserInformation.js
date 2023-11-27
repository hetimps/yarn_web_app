import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';

export const UserApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: prepareHeaders
  }),
  endpoints: (builder) => ({
    UserInfo: builder.mutation({
      query: (body) => ({
        url: '/user/add-name-email',
        method: 'post',
        body,
      }),

    }),

  }),
});

export const { useUserInfoMutation } = UserApi;





