import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const OtpApi = createApi({
  reducerPath: 'OtpApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    userVerify: builder.mutation({
      query: (body) => ({
        url: '/user/verifyotp',
        method: 'post',
        body,
      }),

    }),

    resendOtp: builder.mutation({
      query: (body) => ({
        url: '/user/resend-otp',
        method: 'post',
        body,
      }),
    }),
  }),
});

export const { useUserVerifyMutation,useResendOtpMutation } = OtpApi;





