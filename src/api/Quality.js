
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
            query: ({page,limit,search}) => {
                return {
                    url: '/quality/getall-quality',
                    params: {
                        page,
                        limit,
                        search
                      },
                };
            },
        }),
    }),
});
export const { useGetQualityQuery } = QualityApi;