import { createSlice } from "@reduxjs/toolkit";
import {
    getCategoriesAsync,
    getSinglecategoryAsync,
    getAllproductsAsync,
    getSingleproductAsync,
    reviewProdAsync,
    updateReviewAsync,
    deleteReviewAsync,
    getTopratedprodAsync,
    getOnsaleprodAsync,
    getBestsellingprodAsync,
    getDiscountprodAsync,
} from "./productService";
import { toast } from "react-toastify";



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
