import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
    getArticlesCatAsync,
    getSingleCategoryAsync,
    getAllArticlesAsync,
    getSingleArticleAsync,
    commentArticleAsync,
    updateCommentAsync,
    deleteCommentAsync,
} from "./articleService";



export const articleSlice = createSlice({
    name: "article",
    initialState: {
        categories: [],
        category: [],
        articles: [],
        article: [],
        comments: [],
        comment: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getArticlesCatAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getArticlesCatAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.categories = action.payload;
            })
            .addCase(getArticlesCatAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(getSingleCategoryAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleCategoryAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.category = action.payload;
            })
            .addCase(getSingleCategoryAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(getAllArticlesAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllArticlesAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.articles = action.payload;
            })
            .addCase(getAllArticlesAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(getSingleArticleAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSingleArticleAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.article = action.payload;
            })
            .addCase(getSingleArticleAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(commentArticleAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(commentArticleAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
            })
            .addCase(commentArticleAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(updateCommentAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCommentAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
            })
            .addCase(updateCommentAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(deleteCommentAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCommentAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
            })
            .addCase(deleteCommentAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
    },
});

export const selectIsLoading = (state) => state.root.isLoading;
export const selectIsError = (state) => state.root.isError;
export const selectAllCategories = (state) => state.article.categories;
export const selectArticle = (state) => state.article.article;
export const selectAllArticles = (state) => state.article.articles;
export default articleSlice.reducer;