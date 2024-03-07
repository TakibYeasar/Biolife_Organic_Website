import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getCategories,
    getSinglecategory,
    getAllproducts,
    getSingleproduct,
    reviewProd,
    updateReview,
    deleteReview,
    getTopratedprod,
    getOnsaleprod,
    getBestsellingprod,
    getDiscountprod,
} from "./productService";
import { toast } from "react-toastify";


export const getCategoriesAsync = createAsyncThunk("products/getCategories",
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

export const getSinglecategoryAsync = createAsyncThunk("products/getSinglecategory",
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

export const getAllproductsAsync = createAsyncThunk("products/getAllproducts",
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

export const getSingleproductAsync = createAsyncThunk("products/getSingleproduct",
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

export const reviewProdAsync = createAsyncThunk("products/reviewProd",
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

export const updateReviewAsync = createAsyncThunk("products/updateReview",
    async (reviewId, reviewData, thunkAPI) => {
        try {
            return await updateReview(reviewId, reviewData, thunkAPI);
        } catch (err) {
            toast.error(`Review updated failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const deleteReviewAsync = createAsyncThunk("products/deleteReview",
    async (reviewId, thunkAPI) => {
        try {
            return await deleteReview(reviewId, thunkAPI);
        } catch (err) {
            toast.error(`Delete review failed`);
            console.error(err.response.data);
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getTopratedprodAsync = createAsyncThunk("products/getTopratedprod",
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

export const getOnsaleprodAsync = createAsyncThunk("products/getOnsaleprod",
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

export const getBestsellingprodAsync = createAsyncThunk("products/getBestsellingprod",
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

export const getDiscountprodAsync = createAsyncThunk("products/getDiscountprod",
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
        category: [],
        products: [],
        product: [],
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
                state.categories = action.payload;
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
                state.category = action.payload;
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
                state.products = action.payload;
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
                state.product = action.payload;
            })
            .addCase(getSingleproductAsync.rejected, (state, action) => {
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
                state.reviews = action.payload;
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
                state.reviews = action.payload;
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
            .addCase(getTopratedprodAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTopratedprodAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.topratedProd = action.payload;
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
                state.onsaleProd = action.payload;
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
                state.bestsellingProd = action.payload;
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
                state.discountProd = action.payload;
            })
            .addCase(getDiscountprodAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            });
    },
});

export const selectIsLoading = (state) => state.root.isLoading;
export const selectIsError = (state) => state.root.isError;

export const selectSinglecategory = (state) => state.product.category;
export const selectAllCategories = (state) => state.product.categories;

export const selectSingleproduct = (state) => state.product.product;
export const selectAllproducts = (state) => state.product.products;

export const selectAllreviews = (state) => state.product.reviews;

export const selectAllTopratedprod = (state) => state.product.topratedProd;
export const selectAllOnsaleprod = (state) => state.product.onsaleProd;
export const selectAllBestsellingprod = (state) => state.product.bestsellingProd;
export const selectAllDiscountprod = (state) => state.product.discountProd;

export default productSlice.reducer;
