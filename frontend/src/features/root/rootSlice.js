import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getBanners,
    getFeatured,
    getSpecialoffer,
    getAllbrands,
} from "./rootService";
import { toast } from "react-toastify";


export const getBannersAsync = createAsyncThunk("api/getBanners",
    async (_, thunkAPI) => {
        try {
            return await getBanners();
        } catch (err) {
            toast.error(`Banners not found`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getFeaturedAsync = createAsyncThunk("api/getFeatured",
    async (_, thunkAPI) => {
        try {
            return await getFeatured();
        } catch (err) {
            toast.error(`Featured not found`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getSpecialofferAsync = createAsyncThunk("api/getSpecialoffer",
    async (_, thunkAPI) => {
        try {
            return await getSpecialoffer();
        } catch (err) {
            toast.error(`Special Offer not found`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getAllbrandsAsync = createAsyncThunk("api/getAllbrands",
    async (_, thunkAPI) => {
        try {
            return await getAllbrands();
        } catch (err) {
            toast.error(`Brands not found`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
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
                toast.success(action.payload);
                state.banners.push(action.payload);
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
                toast.success(action.payload);
                state.featureds.push(action.payload);
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
                toast.success(action.payload);
                state.soffer.push(action.payload);
            })
            .addCase(getSpecialofferAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(getAllbrandsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllbrandsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
                state.brands.push(action.payload);
            })
            .addCase(getAllbrandsAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            });
    },
});


export const selectAllBanners = (state) => state.root.banners;
export const selectAllFeatureds = (state) => state.root.featureds;
export const selectSpecialoffer = (state) => state.root.soffer;
export const selectAllBrands = (state) => state.root.brands;

export default rootSlice.reducer;