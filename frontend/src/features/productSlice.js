import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { domain } from "../env";

const initialState = {
    product: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};



//Get Categories
export const getCategories = createAsyncThunk("products/categories/", async (_, thunkAPI) => {
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


//Get Single Category
export const getSinglecategory = createAsyncThunk("products/category-prod/", async (catId, thunkAPI) => {
    try {
        const response = await axios.get(domain + catId);
        return response.data;
    } catch (err) {
        const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


//Get All products
export const getAllproducts = createAsyncThunk("products/all-products/", async (_, thunkAPI) => {
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

//Get Single Product
export const getSingleproduct = createAsyncThunk("products/single-prod/", async (prodId, thunkAPI) => {
    try {
        const response = await axios.get(domain + prodId);
        return response.data;
    } catch (err) {
        const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//Like unlike product
export const reactionProd = createAsyncThunk(
    "products/like-unlike-prod/",
    async (reactionData, thunkAPI) => {
        try {
    console.log(reactionData);
    const response = await axios.post(domain, reactionData);
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

//Review product
export const reviewProd = createAsyncThunk(
    "products/rating-prod/",
    async (reviewData, thunkAPI) => {
        try {
    console.log(reviewData);
    const response = await axios.post(domain, reviewData);
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

//Update review
export const updateReview = createAsyncThunk(
    "products/rating-prod/",
    async (reviewData, thunkAPI) => {
        try {
    const response = await axios.put(domain, reviewData);
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


//Delete review
export const deleteReview = createAsyncThunk(
    "products/rating-prod/",
    async (reviewId, thunkAPI) => {
        try {
    const response = await axios.delete(domain + reviewId);
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

//Get Top rated product
export const getTopratedprod = createAsyncThunk("products/toprated-prod/", async (_, thunkAPI) => {
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


//Get Onsale product
export const getOnsaleprod = createAsyncThunk("products/onsale-prod/", async (_, thunkAPI) => {
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


//Get Bestselling product
export const getBestsellingprod = createAsyncThunk("products/bestselling-prod/", async (_, thunkAPI) => {
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


//Get Discount product
export const getDiscountprod = createAsyncThunk("products/discount-prod/", async (_, thunkAPI) => {
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


export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getSinglecategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSinglecategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(getSinglecategory.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllproducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllproducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(getAllproducts.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getSingleproduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleproduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(getSingleproduct.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(reactionProd.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reactionProd.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(reactionProd.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(reviewProd.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reviewProd.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(reviewProd.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTopratedprod.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTopratedprod.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(getTopratedprod.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getOnsaleprod.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOnsaleprod.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(getOnsaleprod.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getBestsellingprod.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBestsellingprod.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(getBestsellingprod.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getDiscountprod.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDiscountprod.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(getDiscountprod.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
