import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addToCart,
    updateCart,
    removeItemFromCart,
    removeCart,
    createOrder,
    updateOrder,
} from "./shopService";
import { toast } from "react-toastify";

export const addToCartAsync = createAsyncThunk(
    "cart/addToCart",
    async (prodId) => {
        const response = await addToCart(prodId);
        return response.data;
    }
);

export const updateCartItemAsync = createAsyncThunk(
    "cart/updateCartItem",
    async (prodId) => {
        const response = await updateCart(prodId);
        return response.data;
    }
);

export const removeCartItemAsync = createAsyncThunk(
    "cart/removeCartItem",
    async (prodId) => {
        const response = await removeItemFromCart(prodId);
        return response.data;
    }
);

export const removeCartAsync = createAsyncThunk("cart/removeCart", async () => {
    const response = await removeCart();
    return response.data;
});

export const createOrderAsync = createAsyncThunk(
    "order/createOrder",
    async (items) => {
        const response = await createOrder(items);
        return response.data;
    }
);

export const updateOrderAsync = createAsyncThunk(
    "order/updateOrder",
    async (order) => {
        const response = await updateOrder(order);
        return response.data;
    }
);

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        orders: [],
        currentOrder: null,
        totalOrders: 0,
        isError: false,
        isSuccess: false,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.cartItems.push(action.payload);
                toast.success(action.payload);
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(updateCartItemAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartItemAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.cartItems.push(action.payload);
                toast.success(action.payload);
            })
            .addCase(updateCartItemAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(removeCartItemAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeCartItemAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
            })
            .addCase(removeCartItemAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(removeCartAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeCartAsync.fulfilled, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(removeCartAsync.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(createOrderAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders.push(action.payload);
                state.currentOrder = action.payload;
            })
            .addCase(createOrderAsync.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(updateOrderAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrderAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.orders.findIndex(
                    (items) => items.id === action.payload.id
                );
                state.orders[index] = action.payload;
            })
            .addCase(updateOrderAsync.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default cartSlice.reducer;
