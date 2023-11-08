import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { domain } from "../env";

const initialState = {
    root: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};



//Get Banners
export const getBanners = createAsyncThunk("products/banners/", async (_, thunkAPI) => {
    try {
        const response = await axios.get(domain);
        return response.data;
    } catch (err) {
        const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


//Get Featured
export const getFeatured = createAsyncThunk("products/featured/", async (_, thunkAPI) => {
    try {
        const response = await axios.get(domain);
        return response.data;
    } catch (err) {
        const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


//Get Specialoffer
export const getSpecialoffer = createAsyncThunk("products/special-offer/", async (_, thunkAPI) => {
    try {
        const response = await axios.get(domain);
        return response.data;
    } catch (err) {
        const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


//Get All brands
export const getAllbrands = createAsyncThunk("products/all-brands/", async (_, thunkAPI) => {
    try {
        const response = await axios.get(domain);
        return response.data;
    } catch (err) {
        const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBanners.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBanners.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.root.push(action.payload);
            })
            .addCase(getBanners.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getFeatured.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeatured.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.root.push(action.payload);
            })
            .addCase(getFeatured.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getSpecialoffer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSpecialoffer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.root.push(action.payload);
            })
            .addCase(getSpecialoffer.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllbrands.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllbrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.root.push(action.payload);
            })
            .addCase(getAllbrands.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = rootSlice.actions;
export default rootSlice.reducer;
