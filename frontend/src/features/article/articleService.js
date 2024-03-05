import axios from "axios";
import { domain } from "../../env";

// Get Articles Category
export const getArticlesCat = async (_) => {
    const response = await axios.get(`${domain}/api/articles/article_categories`);
    return response.data;
};

// Get Single Category
export const getSingleCategory = async (catId) => {
    const response = await axios.get(`${domain}/api/articles/single/category/${catId}`);
    return response.data;
};

// Get All Articles
export const getAllArticles = async (_) => {
    const response = await axios.get(`${domain}/api/articles/all_articles`);
    return response.data;
};

// Get Single Article
export const getSingleArticle = async (articleId) => {
    const response = await axios.get(`${domain}/api/articles/single/article/${articleId}`);
    return response.data;
};

// Comment Article
export const commentArticle = async (articleId, commentData) => {
    const response = await axios.post(`${domain}/api/articles/${articleId}/create/comment`, commentData);
    return response.data;
};

// Update Comment
export const updateComment = async (commentId, commentData) => {
    const response = await axios.put(`${domain}/api/articles/update/comment/${commentId}`, commentData);
    return response.data;
};

// Delete Comment
export const deleteComment = async (commentId) => {
    const response = await axios.delete(`${domain}/api/articles/delete/comment/${commentId}`);
    return response.data;
};

// Replay Comment Article
export const replayCommentArticle = async (commentId, commentData) => {
    console.log(commentData);
    const response = await axios.post(`${domain}/api/articles/create/reply/comment/${commentId}`, commentData);
    return response.data;
};

// Update Replay Comment
export const updateReplayComment = async (commentId, commentData) => {
    const response = await axios.put(`${domain}/api/articles/update/reply/comment/${commentId}`, commentData);
    return response.data;
};

// Delete Replay Comment
export const deleteReplayComment = async (commentId) => {
    const response = await axios.delete(`${domain}/api/articles/delete/reply/comment/${commentId}`);
    return response.data;
};
