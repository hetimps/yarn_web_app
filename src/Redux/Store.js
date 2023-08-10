import { configureStore } from '@reduxjs/toolkit'
import { LoginApi } from '../api/PhonNumber'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { LoginSlice } from './PhonNumberSlice';
import { OtpApi } from '../api/Otp';
import { UserApi } from '../api/UserInfo';
import { CompanyApi } from '../api/Compnay';

export const store = configureStore({
    reducer: {
        LoginUser: LoginSlice,
        [LoginApi.reducerPath]: LoginApi.reducer,
        [OtpApi.reducerPath] : OtpApi.reducer,
        [UserApi.reducerPath] : UserApi.reducer,
        [CompanyApi.reducerPath] : CompanyApi.reducer,
       
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(LoginApi.middleware)
            .concat(OtpApi.middleware)
            .concat(UserApi.middleware)
            .concat(CompanyApi.middleware)
})

setupListeners(store.dispatch);