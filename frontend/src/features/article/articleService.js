import axios from "axios";
import { domain } from "../../env";

// Get Articles Category
export const getArticlesCat = async (_) => {
    const response = await axios.get(`${domain}/api/articles/categories`);
    return response.data;
};

// Get Single Category
export const getSingleCategory = async (catId) => {
    const response = await axios.get(`${domain}/api/articles/category/single/${catId}`);
    return response.data;
};

// Get All Articles
export const getAllArticles = async (_) => {
    const response = await axios.get(`${domain}/api/articles/articles/`);
    return response.data;
};

// Get Single Article
export const getSingleArticle = async (articleId) => {
    const response = await axios.get(`${domain}/api/articles/article/single/${articleId}`);
    return response.data;
};

// Comment Article
export const commentArticle = async (articleId, commentData) => {
    const response = await axios.post(`${domain}/api/articles/comment/create/${articleId}`, commentData);
    return response.data;
};

// Update Comment
export const updateComment = async (commentId, commentData) => {
    const response = await axios.put(`${domain}/api/articles/comment/update/${commentId}`, commentData);
    return response.data;
};

// Delete Comment
export const deleteComment = async (commentId) => {
    const response = await axios.delete(`${domain}/api/articles/comment/delete/${commentId}`);
    return response.data;
};

// Replay Comment Article
export const replayCommentArticle = async (articleId, commentId, commentData) => {
    console.log(commentData);
    const response = await axios.post(`${domain}/api/articles/comment/reply/create/${articleId}/${commentId}`, commentData);
    return response.data;
};

// Update Replay Comment
export const updateReplayComment = async (articleId, commentId, commentData) => {
    const response = await axios.put(`${domain}/api/articles/comment/reply/update/${articleId}/${commentId}`, commentData);
    return response.data;
};

// Delete Replay Comment
export const deleteReplayComment = async (articleId, commentId) => {
    const response = await axios.delete(`${domain}/api/articles/comment/reply/delete/${articleId}/${commentId}`);
    return response.data;
};
