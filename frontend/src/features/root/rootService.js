import axios from "axios";
import { domain } from "../../env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//Get Banners
export const getBannersAsync = createAsyncThunk("api/getBanners",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${domain}/api/core/banners`);
            return response.data;
        } catch (err) {
            toast.error(`Banners not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);


//Get Featured
export const getFeaturedAsync = createAsyncThunk("api/getFeatured",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${domain}/api/core/featured`);
            return response.data;
        } catch (err) {
            toast.error(`Featured not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);


//Get Specialoffer
export const getSpecialofferAsync = createAsyncThunk("api/getSpecialoffer",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${domain}/api/core/specialoffer`);
            return response.data;
        } catch (err) {
            toast.error(`Special Offer not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);


//Get All brands
export const getBrandsAsync = createAsyncThunk("api/getAllbrands",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${domain}/api/core/brands`);
            return response.data;
        } catch (err) {
            toast.error(`Brands not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

