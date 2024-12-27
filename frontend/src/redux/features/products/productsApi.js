import { apiSlice } from "../../api/api";
import { PRODUCTS_URL } from "../../constant";

export const productsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch Product Categories
        fetchCategory: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/all-prod_categories/`,
            }),
        }),

        // Fetch Single Category
        fetchSingleCategory: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/single-prod_category/${id}/`,
            }),
        }),

        // Create Category
        createCategory: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/create/category/`,
                method: "POST",
                body: data,
            }),
        }),

        // Update Category
        updateCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `${PRODUCTS_URL}/update/category/${id}/`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete Category
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/delete/category/${id}/`,
                method: "DELETE",
            }),
        }),

        // Fetch All Products
        fetchAllProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/all_products/`,
            }),
        }),

        // Fetch Users Products
        fetchUserProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/user_products/`,
            }),
        }),

        // Fetch Single Product
        fetchSingleProduct: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/single-product/${id}/`,
            }),
        }),

        // Create Product
        createProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/create-product/`,
                method: "POST",
                body: data,
            }),
        }),

        // Update Product
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `${PRODUCTS_URL}/update/product/${id}/`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete Product
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/delete/product/${id}/`,
                method: "DELETE",
            }),
        }),

        // Create Product Like
        createProductLike: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/product/${productId}/create/likes/`,
                method: "POST",
            }),
        }),

        // Remove Product Like
        removeProductLike: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/product/${productId}/remove/likes/`,
                method: "DELETE",
            }),
        }),

        // Create Product Review
        createProductReview: builder.mutation({
            query: ({ productId, data }) => ({
                url: `${PRODUCTS_URL}/product/${productId}/create/review/`,
                method: "POST",
                body: data,
            }),
        }),

        // Update Product Review
        updateProductReview: builder.mutation({
            query: ({ reviewId, data }) => ({
                url: `${PRODUCTS_URL}/product/update/review/${reviewId}/`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete Product Review
        deleteProductReview: builder.mutation({
            query: (reviewId) => ({
                url: `${PRODUCTS_URL}/product/delete/review/${reviewId}/`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useFetchCategoryQuery,
    useFetchSingleCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchAllProductsQuery,
    useFetchUserProductsQuery,
    useFetchSingleProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateProductLikeMutation,
    useRemoveProductLikeMutation,
    useCreateProductReviewMutation,
    useUpdateProductReviewMutation,
    useDeleteProductReviewMutation,
} = productsApi;
