import { configureStore } from '@reduxjs/toolkit'
import { LoginApi } from '../api/PhonNumber'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { LoginSlice } from './PhonNumberSlice';
import { OtpApi } from '../api/Otp';
import { UserApi } from '../api/UserInfo';
import { CompanyApi } from '../api/Compnay';
import { JoinApi } from '../api/Join';
import { QualityApi } from '../api/Quality';

export const store = configureStore({
    reducer: {
        LoginUser: LoginSlice,
        [LoginApi.reducerPath]: LoginApi.reducer,
        [OtpApi.reducerPath]: OtpApi.reducer,
        [UserApi.reducerPath]: UserApi.reducer,
        [CompanyApi.reducerPath]: CompanyApi.reducer,
        [JoinApi.reducerPath]: JoinApi.reducer,
        [QualityApi.reducerPath]: QualityApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(LoginApi.middleware)
            .concat(OtpApi.middleware)
            .concat(UserApi.middleware)
            .concat(CompanyApi.middleware)
            .concat(JoinApi.middleware)
            .concat(QualityApi.middleware)
})

setupListeners(store.dispatch);