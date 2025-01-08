import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";
import { productsApi } from "../features/products/productsApi";
import { articlesApi } from "../features/articles/articlesApi";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, productsApi.middleware, articlesApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
