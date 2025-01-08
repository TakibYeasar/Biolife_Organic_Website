import { apiSlice } from "../../api/api";
import { ARTICLES_URL } from "../../constant";

export const articlesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Article Categories
        fetchCategories: builder.query({
            query: () => `${ARTICLES_URL}/article_categories/`,
        }),
        fetchSingleCategory: builder.query({
            query: (id) => `${ARTICLES_URL}/single-article-category/${id}/`,
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: `${ARTICLES_URL}/create-article-category/`,
                method: "POST",
                body: data,
            }),
        }),
        updateCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `${ARTICLES_URL}/update-article-category/${id}/`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `${ARTICLES_URL}/delete-article-category/${id}/`,
                method: "DELETE",
            }),
        }),

        // Articles
        fetchArticles: builder.query({
            query: () => `${ARTICLES_URL}/all_articles/`,
        }),
        fetchSingleArticle: builder.query({
            query: (id) => `${ARTICLES_URL}/single-article/${id}/`,
        }),
        createArticle: builder.mutation({
            query: (data) => ({
                url: `${ARTICLES_URL}/create-article/`,
                method: "POST",
                body: data,
            }),
        }),
        updateArticle: builder.mutation({
            query: ({ id, data }) => ({
                url: `${ARTICLES_URL}/update-article/${id}/`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteArticle: builder.mutation({
            query: (id) => ({
                url: `${ARTICLES_URL}/delete-article/${id}/`,
                method: "DELETE",
            }),
        }),

        // Article Likes/Unlikes
        likeArticle: builder.mutation({
            query: (articleId) => ({
                url: `${ARTICLES_URL}/like-article/${articleId}/`,
                method: "POST",
            }),
        }),
        unlikeArticle: builder.mutation({
            query: (articleId) => ({
                url: `${ARTICLES_URL}/unlike-article/${articleId}/`,
                method: "DELETE",
            }),
        }),

        // Article Comments
        createComment: builder.mutation({
            query: ({ articleId, data }) => ({
                url: `${ARTICLES_URL}/article/${articleId}/create-comment/`,
                method: "POST",
                body: data,
            }),
        }),
        updateComment: builder.mutation({
            query: ({ commentId, data }) => ({
                url: `${ARTICLES_URL}/article-update-comment/${commentId}/`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: `${ARTICLES_URL}/article-delete-comment/${commentId}/`,
                method: "DELETE",
            }),
        }),

        // Comment Likes/Dislikes
        likeDislikeComment: builder.mutation({
            query: ({ commentId, data }) => ({
                url: `${ARTICLES_URL}/article-comment/${commentId}/create-like_dislike/`,
                method: "POST",
                body: data,
            }),
        }),
        removeLikeDislikeComment: builder.mutation({
            query: (commentId) => ({
                url: `${ARTICLES_URL}/article-comment/${commentId}/remove-like_dislike/`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useFetchCategoriesQuery,
    useFetchSingleCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,

    useFetchArticlesQuery,
    useFetchSingleArticleQuery,
    useCreateArticleMutation,
    useUpdateArticleMutation,
    useDeleteArticleMutation,

    useLikeArticleMutation,
    useUnlikeArticleMutation,

    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,

    useLikeDislikeCommentMutation,
    useRemoveLikeDislikeCommentMutation,
} = articlesApi;
