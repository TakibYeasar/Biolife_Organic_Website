import { createSlice } from "@reduxjs/toolkit";
import {
    registerUserAsync,
    verifyAccountAsync,
    loginUserAsync,
    logOutUserAsync,
    forgotPasswordRequestAsync,
    changePasswordAsync,
} from "./authService";
import { toast } from "react-toastify";


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        isError: false,
        isSuccess: false,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUserAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.token = action.payload;
                toast.success(action.payload);
            })
            .addCase(registerUserAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.user = null;
                toast.error(action.payload);
            })
            .addCase(verifyAccountAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyAccountAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
            })
            .addCase(verifyAccountAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(loginUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.token = action.payload;
                toast.success(action.payload);
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.user = null;
                toast.error(action.payload);
            })
            .addCase(logOutUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logOutUserAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
                state.token = null;
                toast.success(action.payload);
            })
            .addCase(logOutUserAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(forgotPasswordRequestAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPasswordRequestAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
            })
            .addCase(forgotPasswordRequestAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(changePasswordAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changePasswordAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
            })
            .addCase(changePasswordAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            });
    },
});

export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsError = (state) => state.auth.isError;
export const selectCurrentUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;
