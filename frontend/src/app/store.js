import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import rootReducer from "../../features/root/rootSlice";
import productReducer from "../../features/product/productSlice";
import cartReducer from "../../features/cart/cartSlice";
import blogReducer from "../../features/blog/blogSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        root: rootReducer,
        product: productReducer,
        cart: cartReducer,
        blog: blogReducer,
    },
});