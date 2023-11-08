import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { domain } from "../../env";

// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Register listeners
export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            console.log(userData);
            const response = await axios.post(domain, userData);

            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        } catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Register listeners
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        console.log(userData);
        const response = await axios.get(domain, userData);

        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    } catch (err) {
        const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk(
    "auth/logout",
    async (user) => async () => {
        localStorage.removeItem(user);
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.user = null;
            })

            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.user = null;
            })
            
            .addCase(logout.fulfilled, (state, action) => {
                state.user = null;
            });
    },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
