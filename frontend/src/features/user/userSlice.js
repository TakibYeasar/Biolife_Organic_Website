import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    profileView,
    updateProfile,
    addAddress,
    editAddress,
    removeAddress,
} from "./userService";
import { toast } from "react-toastify";


export const profileViewAsync = createAsyncThunk(
    "user/profileView",
    async () => await profileView()
);

export const updateProfileAsync = createAsyncThunk(
    "user/updateProfile",
    async (userData, thunkAPI) => await updateProfile(userData, thunkAPI)
);

export const addAddressAsync = createAsyncThunk(
    "user/addAddress",
    async (addressData, thunkAPI) => await addAddress(addressData, thunkAPI)
);

export const editAddressAsync = createAsyncThunk(
    "user/editAddress",
    async (addressData, thunkAPI) => await editAddress(addressData, thunkAPI)
);

export const removeAddressAsync = createAsyncThunk(
    "user/removeAddress",
    async () => await removeAddress()
);


export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: null,
        userAddress: null,
        isError: false,
        isSuccess: false,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(profileViewAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(profileViewAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userInfo = action.payload;
                toast.success(action.payload);
            })
            .addCase(profileViewAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(updateProfileAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfileAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userInfo = action.payload;
                toast.success(action.payload);
            })
            .addCase(updateProfileAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(addAddressAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addAddressAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userAddress = action.payload;
                toast.success(action.payload);
            })
            .addCase(addAddressAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(editAddressAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editAddressAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userAddress = action.payload;
                toast.success(action.payload);
            })
            .addCase(editAddressAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(removeAddressAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeAddressAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
            })
            .addCase(removeAddressAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
    },
});

export const { increment } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
