import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { domain } from "../../env";

//Get Categories
export const getCategoriesAsync = createAsyncThunk("products/getCategories",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${domain}/api/products/product_categories`);
            return response.data;
        } catch (err) {
            toast.error(`Categories not found`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

//Get Single Category
export const getSinglecategoryAsync = createAsyncThunk("products/getSinglecategory",
    async (catId, thunkAPI) => {
        try {
            const response = await axios.get(`${domain}/api/products/single/category/${catId}`);
            return response.data;
        } catch (err) {
            toast.error(`Single Categories not found`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


//Get All products
export const getAllproductsAsync = createAsyncThunk("products/getAllproducts",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${domain}/api/products/all_products`);
            return response.data;
        } catch (err) {
            toast.error(`Get Allproducts failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

//Get Single Product
export const getSingleproductAsync = createAsyncThunk("products/getSingleproduct",
    async (prodId, thunkAPI) => {
        try {
            const response = await axios.get(`${domain}/api/products/single/product/${prodId}`);
            return response.data;
        } catch (err) {
            toast.error(`Get single product failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

//Review product
export const reviewProdAsync = createAsyncThunk("products/reviewProd",
    async (prodId, reviewData, thunkAPI) => {
        try {
            const response = await axios.post(`${domain}/api/products/product/${prodId}/create/review`, reviewData);
            return response.data;
        } catch (err) {
            toast.error(`Review created failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

//Update review
export const updateReviewAsync = createAsyncThunk("products/updateReview",
    async (reviewId, reviewData, thunkAPI) => {
        try {
            const response = await axios.put(`${domain}/api/products/product/update/review/${reviewId}`, reviewData);
            return response.data;
        } catch (err) {
            toast.error(`Review updated failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


//Delete review
export const deleteReviewAsync = createAsyncThunk("products/deleteReview",
    async (reviewId, thunkAPI) => {
        try {
            const response = await axios.delete(`${domain}/api/products/product/delete/review/${reviewId}`);
            return response.data;
        } catch (err) {
            toast.error(`Delete review failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);



//Get Top rated product
export const getTopratedprodAsync = createAsyncThunk("products/getTopratedprod",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${domain}/api/products/toprated_prod`);
            return response.data;
        } catch (err) {
            toast.error(`Get toprated product failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


//Get Onsale product
export const getOnsaleprodAsync = createAsyncThunk("products/getOnsaleprod",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${domain}/api/products/onsale_prod`);
            return response.data;
        } catch (err) {
            toast.error(`Get onsale product failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


//Get Bestselling product
export const getBestsellingprodAsync = createAsyncThunk("products/getBestsellingprod",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${domain}/api/products/bestselling_prod`);
            return response.data;
        } catch (err) {
            toast.error(`Get bestselling product failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


//Get Discount product
export const getDiscountprodAsync = createAsyncThunk("products/getDiscountprod",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${domain}/api/products/discount_prod`);
            return response.data;
        } catch (err) {
            toast.error(`Get discount product failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);


