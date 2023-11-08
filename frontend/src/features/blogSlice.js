import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { domain } from "../env";

const initialState = {
    blog: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};



//Get Articles cateogry
export const getArticlescat = createAsyncThunk("products/articles-cat/", async (_, thunkAPI) => {
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

//Get Articles cateogry
export const getAllarticles = createAsyncThunk("products/all-articles/", async (_, thunkAPI) => {
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
export const getSinglecategory = createAsyncThunk("products/category-articles/", async (catId, thunkAPI) => {
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

//Get Single Article
export const getSinglearticle = createAsyncThunk("products/single-prod/", async (prodId, thunkAPI) => {
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


//Comment Article
export const commentArticle = createAsyncThunk(
    "products/comment-article/",
    async (commentData, thunkAPI) => {
        try {
            console.log(reviewData);
            const response = await axios.post(domain, commentData);
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

//Update comment
export const updateComment = createAsyncThunk(
    "products/comment-article/",
    async (commentData, thunkAPI) => {
        try {
            const response = await axios.put(domain, commentData);
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


//Delete comment
export const deleteComment = createAsyncThunk(
    "products/comment-article/",
    async (commentId, thunkAPI) => {
        try {
            const response = await axios.delete(domain + commentId);
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


//Replay Comment Article
export const replaycommentArticle = createAsyncThunk(
    "products/replay-comment/",
    async (commentData, thunkAPI) => {
        try {
            console.log(reviewData);
            const response = await axios.post(domain, commentData);
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

//Update replay comment
export const updateReplaycomment = createAsyncThunk(
    "products/replay-comment/",
    async (commentData, thunkAPI) => {
        try {
            const response = await axios.put(domain, commentData);
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


//Delete replay comment
export const deleteReplaycomment = createAsyncThunk(
    "products/replay-comment/",
    async (commentId, thunkAPI) => {
        try {
            const response = await axios.delete(domain + commentId);
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



export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getArticlescat.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getArticlescat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blog.push(action.payload);
            })
            .addCase(getArticlescat.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllarticles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllarticles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.blog.push(action.payload);
            })
            .addCase(getAllarticles.rejected, (state, action) => {
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
            .addCase(getSinglearticle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSinglearticle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(getSinglearticle.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(commentArticle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(commentArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(commentArticle.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteComment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(replaycommentArticle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(replaycommentArticle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(replaycommentArticle.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateReplaycomment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateReplaycomment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(updateReplaycomment.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteReplaycomment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteReplaycomment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.product.push(action.payload);
            })
            .addCase(deleteReplaycomment.rejected, (state, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;
