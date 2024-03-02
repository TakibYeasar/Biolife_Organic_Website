import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
    getArticlesCat,
    getSingleCategory,
    getAllArticles,
    getSingleArticle,
    commentArticle,
    updateComment,
    deleteComment,
    replayCommentArticle,
    updateReplayComment,
    deleteReplayComment,
} from "./articleService";


export const getArticlesCatAsync = createAsyncThunk("articles/getArticlesCat",
    async () => {
        try {
            return await getArticlesCat();
        } catch (err) {
            toast.error(`Article Categories not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const getSingleCategoryAsync = createAsyncThunk("articles/getSingleCategory",
    async (catId, thunkAPI) => {
        try {
            return await getSingleCategory(catId, thunkAPI);
        } catch (err) {
            toast.error(`Single article category not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const getAllArticlesAsync = createAsyncThunk("articles/getAllArticles",
    async () => {
        try {
            return await getAllArticles();
        } catch (err) {
            toast.error(`Articles not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const getSingleArticleAsync = createAsyncThunk("articles/getSingleArticle",
    async (articleId, thunkAPI) => {
        try {
            return await getSingleArticle(articleId, thunkAPI);
        } catch (err) {
            toast.error(`Single article not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const commentArticleAsync = createAsyncThunk("articles/commentArticle",
    async (articleId, commentData, thunkAPI) => {
        try {
            return await commentArticle(articleId, commentData, thunkAPI);
        } catch (err) {
            toast.error(`Comments not found`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const updateCommentAsync = createAsyncThunk("articles/updateComment",
    async (commentId, commentData, thunkAPI) => {
        try {
            return await updateComment(commentId, commentData, thunkAPI);
        } catch (err) {
            toast.error(`Update comment failed`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const deleteCommentAsync = createAsyncThunk("articles/deleteComment",
    async (commentId, thunkAPI) => {
        try {
            return await deleteComment(commentId, thunkAPI);
        } catch (err) {
            toast.error(`Delete comment failed`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const replayCommentArticleAsync = createAsyncThunk("articles/replayCommentArticle",
    async (articleId, commentId, commentData, thunkAPI) => {
        try {
            return await replayCommentArticle(articleId, commentId, commentData, thunkAPI);
        } catch (err) {
            toast.error(`Replay comment failed`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const updateReplayCommentAsync = createAsyncThunk("articles/updateReplayComment",
    async (articleId, commentId, commentData, thunkAPI) => {
        try {
            return await updateReplayComment(articleId, commentId, commentData, thunkAPI);
        } catch (err) {
            toast.error(`Replay comment updated failed`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const deleteReplayCommentAsync = createAsyncThunk("articles/deleteReplayComment",
    async (articleId, commentId, thunkAPI) => {
        try {
            return await deleteReplayComment(articleId, commentId, thunkAPI);
        } catch (err) {
            toast.error(`Replay comment deleted failed`);
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

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
            .addCase(replayCommentArticleAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(replayCommentArticleAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
            })
            .addCase(replayCommentArticleAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(updateReplayCommentAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateReplayCommentAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
            })
            .addCase(updateReplayCommentAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            })
            .addCase(deleteReplayCommentAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteReplayCommentAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload);
            })
            .addCase(deleteReplayCommentAsync.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                toast.error(action.payload);
            });
    },
});

export const selectIsLoading = (state) => state.root.isLoading;
export const selectIsError = (state) => state.root.isError;
export const selectAllCategories = (state) => state.article.categories;
export const selectAllArticles = (state) => state.article.articles;
export default articleSlice.reducer;