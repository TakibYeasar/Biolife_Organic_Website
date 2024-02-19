import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getCategories,
    getSinglecategory,
    getAllproducts,
    getSingleproduct,
    reactionProd,
    reviewProd,
    updateReview,
    deleteReview,
    getTopratedprod,
    getOnsaleprod,
    getBestsellingprod,
    getDiscountprod,
} from "./productService";
import { toast } from "react-toastify";


export const getCategoriesAsync = createAsyncThunk("review/getCategories",
    async (_, thunkAPI) => {
        try {
            return await getCategories();
        } catch (err) {
            toast.error(`Categories not found`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getSinglecategoryAsync = createAsyncThunk("review/getSinglecategory",
    async (catId, thunkAPI) => {
        try {
            return await getSinglecategory(catId, thunkAPI);
        } catch (err) {
            toast.error(`Single Categories not found`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getAllproductsAsync = createAsyncThunk("review/getAllproducts",
    async (_, thunkAPI) => {
        try {
            return await getAllproducts();
        } catch (err) {
            toast.error(`Get Allproducts failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getSingleproductAsync = createAsyncThunk("review/getSingleproduct",
    async (prodId, thunkAPI) => {
        try {
            return await getSingleproduct(prodId, thunkAPI);
        } catch (err) {
            toast.error(`Get single product failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const reactionProdAsync = createAsyncThunk("review/reactionProd",
    async (prodId, reactionData, thunkAPI) => {
        try {
            return await reactionProd(prodId, reactionData, thunkAPI);
        } catch (err) {
            toast.error(`update reaction failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const reviewProdAsync = createAsyncThunk("review/reviewProd",
    async (prodId, reviewData, thunkAPI) => {
        try {
            return await reviewProd(prodId, reviewData, thunkAPI);
        } catch (err) {
            toast.error(`Review created failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const updateReviewAsync = createAsyncThunk("review/updateReview",
    async (prodId, reviewId, reviewData, thunkAPI) => {
        try {
            return await updateReview(prodId, reviewId, reviewData, thunkAPI);
        } catch (err) {
            toast.error(`Review updated failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const deleteReviewAsync = createAsyncThunk("review/deleteReview",
    async (prodId, reviewId, thunkAPI) => {
        try {
            return await deleteReview(prodId, reviewId, thunkAPI);
        } catch (err) {
            toast.error(`Delete review failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getTopratedprodAsync = createAsyncThunk("review/getTopratedprod",
    async (_, thunkAPI) => {
        try {
            return await getTopratedprod();
        } catch (err) {
            toast.error(`Get toprated product failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getOnsaleprodAsync = createAsyncThunk("review/getOnsaleprod",
    async (_, thunkAPI) => {
        try {
            return await getOnsaleprod();
        } catch (err) {
            toast.error(`Get onsale product failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getBestsellingprodAsync = createAsyncThunk("review/getBestsellingprod",
    async (_, thunkAPI) => {
        try {
            return await getBestsellingprod();
        } catch (err) {
            toast.error(`Get bestselling product failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getDiscountprodAsync = createAsyncThunk("review/getDiscountprod",
    async (_, thunkAPI) => {
        try {
            return await getDiscountprod();
        } catch (err) {
            toast.error(`Get discount product failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const productSlice = createSlice({
    name: "product",
    initialState: {
        categories: [],
        products: [],
        reviews: [],
        topratedProd: [],
        onsaleProd: [],
        bestsellingProd: [],
        discountProd: [],
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategoriesAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
                state.categories.push(action.payload);
            })
            .addCase(getCategoriesAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(getSinglecategoryAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSinglecategoryAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
                state.categories.push(action.payload);
            })
            .addCase(getSinglecategoryAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(getAllproductsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllproductsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
                state.products.push(action.payload);
            })
            .addCase(getAllproductsAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(getSingleproductAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleproductAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
                state.products.push(action.payload);
            })
            .addCase(getSingleproductAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(reactionProdAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reactionProdAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
            })
            .addCase(reactionProdAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(reviewProdAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reviewProdAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
                state.reviews.push(action.payload);
            })
            .addCase(reviewProdAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(updateReviewAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateReviewAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
                state.reviews.push(action.payload);
            })
            .addCase(updateReviewAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(deleteReviewAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteReviewAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
            })
            .addCase(deleteReviewAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(getSingleProductReviewsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleProductReviewsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
                state.reviews.push(action.payload);
            })
            .addCase(getSingleProductReviewsAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(getTopratedprodAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTopratedprodAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
                state.topratedProd.push(action.payload);
            })
            .addCase(getTopratedprodAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(getOnsaleprodAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOnsaleprodAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
                state.onsaleProd.push(action.payload);
            })
            .addCase(getOnsaleprodAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(getBestsellingprodAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBestsellingprodAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
                state.bestsellingProd.push(action.payload);
            })
            .addCase(getBestsellingprodAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(getDiscountprodAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDiscountprodAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
                state.discountProd.push(action.payload);
            })
            .addCase(getDiscountprodAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            });
    },
});

export const selectSinglecategory = (state) => state.product.category;
export const selectAllCategories = (state) => state.product.categories;
export const selectSingleproduct = (state) => state.product.product;
export const selectAllproducts = (state) => state.product.products;
export const selectAllreaction = (state) => state.product.reaction;
export const selectAllreviews = (state) => state.product.reviews;
export const selectAllspReviews = (state) => state.product.spReviews;
export const selectAlltopratedProd = (state) => state.product.topratedProd;
export const selectAllonsaleProd = (state) => state.product.onsaleProd;
export const selectAllbestsellingProd = (state) => state.product.bestsellingProd;
export const selectAlldiscountProd = (state) => state.product.discountProd;

export default productSlice.reducer;
