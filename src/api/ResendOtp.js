import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ResendOtpApi = createApi({
  reducerPath: 'ResendOtpApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    resendOtp: builder.mutation({
      query: (body) => ({
        url: '/user/resend-otp',
        method: 'post',
        body,
      }),
    }),
  }),
});

export const { useResendOtpMutation } = ResendOtpApi;





