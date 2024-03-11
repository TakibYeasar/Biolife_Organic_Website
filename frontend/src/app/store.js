import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
// import userReducer from "../features/user/userSlice";
import rootReducer from "../features/root/rootSlice";
import productReducer from "../features/product/productSlice";
// import shopReducer from "../features/shop/shopSlice";
import articleReducer from "../features/article/articleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // user: userReducer,
    root: rootReducer,
    product: productReducer,
    // shop: shopReducer,
    article: articleReducer,
  },
});
