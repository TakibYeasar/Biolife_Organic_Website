import axios from "axios";
import { domain } from "../../env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// view profile
export const profileViewAsync = createAsyncThunk(
    "user/profileView",
    async () => {
        try {
            const response = await axios.get(`${domain}/auth/profile/`);
            return response.data;
        } catch (err) {
            toast.error(`Profile Not Found`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

// update profile
export const updateProfileAsync = createAsyncThunk(
    "user/updateProfile",
    async (userData, thunkAPI) => {
        try {
            const response = await axios.put(`${domain}/auth/update-profile/`, userData);
            return response.data;
        } catch (err) {
            toast.error(`Profile updated failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);



// add address
export const addAddressAsync = createAsyncThunk(
    "user/addAddress",
    async (addressData, thunkAPI) => {
        try {
            const response = await axios.post(`${domain}/auth/add-address/`, addressData);
            return response.data;
        } catch (err) {
            toast.error(`Address add failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

// edit address
export const editAddressAsync = createAsyncThunk(
    "user/editAddress",
    async (addressData, thunkAPI) => {
        try {
            const response = await axios.put(`${domain}/auth/update-address/`, addressData);
            return response.data;
        } catch (err) {
            toast.error(`Address edit failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


// delete address
export const removeAddressAsync = createAsyncThunk(
    "user/removeAddress",
    async () => {
        try {
            const response = await axios.delete(`${domain}/auth/remove-address/`);
            return response.data;
        } catch (err) {
            toast.error(`Address removed failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);
