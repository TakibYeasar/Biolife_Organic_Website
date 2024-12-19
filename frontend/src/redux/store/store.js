import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";
import { productsApi } from "../features/products/productsApi";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, productsApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
