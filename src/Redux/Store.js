import { configureStore } from '@reduxjs/toolkit'
import { LoginApi } from '../api/PhonNumber'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { LoginSlice } from './PhonNumberSlice';

export const store = configureStore({
    reducer: {
        LoginUser: LoginSlice,
        [LoginApi.reducerPath]: LoginApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(LoginApi.middleware)

})

setupListeners(store.dispatch);