import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const prepareHeaders = (headers) => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token)
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};

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





