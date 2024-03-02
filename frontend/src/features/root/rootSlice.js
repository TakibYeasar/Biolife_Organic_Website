import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getBanners,
    getFeatured,
    getSpecialoffer,
    getBrands,
} from "./rootService";
import { toast } from "react-toastify";


export const getBannersAsync = createAsyncThunk("api/getBanners",
    async (_, thunkAPI) => {
        try {
            return await getBanners();
        } catch (err) {
            toast.error(`Banners not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const getFeaturedAsync = createAsyncThunk("api/getFeatured",
    async (_, thunkAPI) => {
        try {
            return await getFeatured();
        } catch (err) {
            toast.error(`Featured not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const getSpecialofferAsync = createAsyncThunk("api/getSpecialoffer",
    async (_, thunkAPI) => {
        try {
            return await getSpecialoffer();
        } catch (err) {
            toast.error(`Special Offer not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const getBrandsAsync = createAsyncThunk("api/getAllbrands",
    async (_, thunkAPI) => {
        try {
            return await getBrands();
        } catch (err) {
            toast.error(`Brands not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const rootSlice = createSlice({
    name: "root",
    initialState: {
        banners: [],
        featureds: [],
        soffer: [],
        brands: [],
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBannersAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBannersAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.banners = action.payload;
            })
            .addCase(getBannersAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(getFeaturedAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeaturedAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.featureds = action.payload;
            })
            .addCase(getFeaturedAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(getSpecialofferAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSpecialofferAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.soffer = action.payload;
            })
            .addCase(getSpecialofferAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(getBrandsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBrandsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.brands = action.payload;
            })
            .addCase(getBrandsAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            });
    },
});


export const selectIsLoading = (state) => state.root.isLoading;
export const selectIsError = (state) => state.root.isError;
export const selectAllBanners = (state) => state.root.banners;
export const selectAllFeatureds = (state) => state.root.featureds;
export const selectSpecialoffer = (state) => state.root.soffer;
export const selectAllBrands = (state) => state.root.brands;

export default rootSlice.reducer;