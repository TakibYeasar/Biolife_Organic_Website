import axios from "axios";
import { domain } from "../../env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Get Articles Category
export const getArticlesCatAsync = createAsyncThunk("articles/getArticlesCat",
    async () => {
        try {
            const response = await axios.get(`${domain}/api/articles/article_categories`);
            return response.data;
        } catch (err) {
            toast.error(`Article Categories not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// Get Single Category
export const getSingleCategoryAsync = createAsyncThunk("articles/getSingleCategory",
    async (catId, thunkAPI) => {
        try {
            const response = await axios.get(`${domain}/api/articles/single/category/${catId}`);
            return response.data;
        } catch (err) {
            toast.error(`Single article category not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// Get All Articles
export const getAllArticlesAsync = createAsyncThunk("articles/getAllArticles",
    async () => {
        try {
            const response = await axios.get(`${domain}/api/articles/all_articles`);
            return response.data;
        } catch (err) {
            toast.error(`Articles not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// Get Single Article
export const getSingleArticleAsync = createAsyncThunk("articles/getSingleArticle",
    async (articleId, thunkAPI) => {
        try {
            const response = await axios.get(`${domain}/api/articles/single/article/${articleId}`);
            return response.data;
        } catch (err) {
            toast.error(`Single article not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// Comment Article
export const commentArticleAsync = createAsyncThunk("articles/commentArticle",
    async (articleId, commentData, thunkAPI) => {
        try {
            const response = await axios.post(`${domain}/api/articles/article/${articleId}/create/comment/`, commentData);
            return response.data;
        } catch (err) {
            toast.error(`Comments not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// Update Comment
export const updateCommentAsync = createAsyncThunk("articles/updateComment",
    async (commentId, commentData, thunkAPI) => {
        try {
            const response = await axios.put(`${domain}/api/articles/update/comment/${commentId}`, commentData);
            return response.data;
        } catch (err) {
            toast.error(`Update comment failed`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

// Delete Comment
export const deleteCommentAsync = createAsyncThunk("articles/deleteComment",
    async (commentId, thunkAPI) => {
        try {
            const response = await axios.delete(`${domain}/api/articles/delete/comment/${commentId}`);
            return response.data;
        } catch (err) {
            toast.error(`Delete comment failed`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);
