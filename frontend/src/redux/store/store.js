import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";
import { coreApi } from "../features/core/coreApi";
import { articlesApi } from "../features/articles/articlesApi";
import { productsApi } from "../features/products/productsApi";
import { cartApi } from "../features/cart/cartApi";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, coreApi.middleware, articlesApi.middleware, productsApi.middleware, cartApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
