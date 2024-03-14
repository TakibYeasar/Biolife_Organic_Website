import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    registerUser,
    verifyAccount,
    loginUser,
    logOutUser,
    forgotPasswordRequest,
    changePassword,
} from "./authService";
import { toast } from "react-toastify";


export const registerUserAsync = createAsyncThunk("auth/registerUser",
    async (userData, thunkAPI) => {
        try {
            return await registerUser(userData, thunkAPI);
        } catch (err) {
            toast.error(`Registration failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


export const verifyAccountAsync = createAsyncThunk("auth/verifyAccount",
    async (data, thunkAPI) => {
        try {
            return await verifyAccount(data, thunkAPI);
        } catch (err) {
            toast.error(`Email varifyed request failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const loginUserAsync = createAsyncThunk("auth/loginUser",
    async (user, thunkAPI) => {
        try {
            return await loginUser(user, thunkAPI);
        } catch (err) {
            toast.error(`Login failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const logOutUserAsync = createAsyncThunk("auth/logOutUser",
    async (_, thunkAPI) => {
        try {
            return await logOutUser(_, thunkAPI);
        } catch (err) {
            toast.error(`Logout failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const forgotPasswordRequestAsync = createAsyncThunk("auth/forgotPassword",
    async (data, thunkAPI) => {
        try {
            return await forgotPasswordRequest(data, thunkAPI);
        } catch (err) {
            toast.error(`Forgot password request failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const changePasswordAsync = createAsyncThunk("auth/changePassword",
    async (data, thunkAPI) => {
        try {
            return await changePassword(data, thunkAPI);
        } catch (err) {
            toast.error(`Password change failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
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
export const selectUser = (state) => state.auth.user || {};
export default authSlice.reducer;
