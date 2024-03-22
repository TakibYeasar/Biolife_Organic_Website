import axios from "axios";
import { toast } from "react-toastify";
import { domain } from "../../env";
import { createAsyncThunk } from "@reduxjs/toolkit";

// add to cart product
export const myCart = async (prodId) => {
    try {
        const response = await axios.post(`${domain}/shop/add-to-cart/${prodId}/`);
        return response.data;
    } catch (err) {
        toast.error(`Add to cart failed`);
        console.error(err.response.data);
        return thunkAPI.rejectWithValue(err.response.data);
    }
};

// add to cart product
export const addToCartAsync = createAsyncThunk(
    "cart/addToCart",
    async (prodId) => {
        try {
            const response = await axios.post(`${domain}/shop/add-to-cart/${prodId}/`);
            return response.data;
        } catch (err) {
            toast.error(`Add to cart failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

// update cart
export const updateCartItemAsync = createAsyncThunk(
    "cart/updateCartItem",
    async (prodId) => {
        try {
            const response = await axios.put(`${domain}/shop/update-cart/${prodId}/`);
            return response.data;
        } catch (err) {
            toast.error(`Update cart failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

// remove item from cart
export const removeCartItemAsync = createAsyncThunk(
    "cart/removeCartItem",
    async (prodId) => {
        try {
            const response = await axios.delete(`${domain}/shop/remove-cart-item/${prodId}/`);
            return response.data;
        } catch (err) {
            toast.error(`Remove item from cart failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


// delete full cart
export const removeCartAsync = createAsyncThunk("cart/removeCart", async () => {
    try {
        const response = await axios.delete(`${domain}/shop/delete-cart/`);
        return response.data;
    } catch (err) {
        toast.error(`Remove cart failed`);
        console.error(err.response.data);
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

// create order
export const createOrderAsync = createAsyncThunk(
    "order/createOrder",
    async (orderData) => {
        try {
            const response = await axios.post(`${domain}/shop/create-order/`, orderData);
            return response.data;
        } catch (err) {
            toast.error(`Order Created failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

// update order
export const updateOrderAsync = createAsyncThunk(
    "order/updateOrder",
    async (order) => {
        try {
            const response = await axios.post(`${domain}/shop/update-order/${orderId}`);
            return response.data;
        } catch (err) {
            toast.error(`Order updated failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);
