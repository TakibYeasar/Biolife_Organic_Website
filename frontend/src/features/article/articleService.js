import axios from "axios";
import { domain } from "../../env";

// Get Articles Category
export const getArticlesCat = async (_) => {
    const response = await axios.get(`${domain}core/articles-cat/`);
    return response.data;
};

// Get Single Category
export const getSingleCategory = async (catId) => {
    const response = await axios.get(`${domain}/core/category-articles/${catId}`);
    return response.data;
};

// Get All Articles
export const getAllArticles = async (_) => {
    const response = await axios.get(`${domain}/core/all-articles/`);
    return response.data;
};

// Get Single Article
export const getSingleArticle = async (articleId) => {
    const response = await axios.get(`${domain}/core/single-article/${articleId}`);
    return response.data;
};

// Comment Article
export const commentArticle = async (articleId, commentData) => {
    const response = await axios.post(`${domain}/core/single-article/${articleId}/comment-article/`, commentData);
    return response.data;
};

// Update Comment
export const updateComment = async (articleId, commentId, commentData) => {
    const response = await axios.put(`${domain}/core/single-article/${articleId}/comment-article/${commentId}/update-comment/`, commentData);
    return response.data;
};

// Delete Comment
export const deleteComment = async (articleId, commentId) => {
    const response = await axios.delete(`${domain}/core/single-article/${articleId}/comment-article/${commentId}/delete-comment/`);
    return response.data;
};

// Replay Comment Article
export const replayCommentArticle = async (articleId, commentId, commentData) => {
    console.log(commentData);
    const response = await axios.post(`${domain}/core/single-article/${articleId}/comment-article/${commentId}/replay-comment/`, commentData);
    return response.data;
};

// Update Replay Comment
export const updateReplayComment = async (articleId, commentId, repCmtId, commentData) => {
    const response = await axios.put(`${domain}/core/single-article/${articleId}/comment-article/${commentId}/replay-comment/${repCmtId}/update-comment/`, commentData);
    return response.data;
};

// Delete Replay Comment
export const deleteReplayComment = async (articleId, commentId, repCmtId) => {
    const response = await axios.delete(`${domain}/core/single-article/${articleId}/comment-article/${commentId}/replay-comment/${repCmtId}/delete-comment/`);
    return response.data;
};
