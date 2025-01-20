import { apiSlice } from "../../api/api";
import { PRODUCTS_URL } from "../../constant";

export const productsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch Product Categories
        fetchProdCategory: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/all-prod_categories/`,
            }),
        }),

        // Fetch Single Category
        fetchSingleProdCategory: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/single-prod_category/${id}/`,
            }),
        }),

        // Create Category
        createProdCategory: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/create-prod_category/`,
                method: "POST",
                body: data,
            }),
        }),

        // Update Category
        updateProdCategory: builder.mutation({
            query: ({ categoryId, formData }) => ({
                url: `${PRODUCTS_URL}/update-prod_category/${categoryId}/`,
                method: "PUT",
                body: formData,
            }),
        }),

        // Delete Category
        deleteProdCategory: builder.mutation({
            query: (categoryId) => ({
                url: `${PRODUCTS_URL}/delete-prod_category/${categoryId}/`,
                method: "DELETE",
            }),
        }),

        // Manage all prods
        manageProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/manage-prods/`,
            }),
        }),

        // Edit approval status of a prod by its ID
        editApproval: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/prods/${id}/edit-approval/`,
                method: "PUT",
            }),
        }),

        // Remove a prod by its ID
        removeProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/prods/${id}/remove/`,
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
                url: `${PRODUCTS_URL}/product/${productId}/create-likes/`,
                method: "POST",
            }),
        }),

        // Remove Product Like
        removeProductLike: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/product/${productId}/remove-likes/`,
                method: "DELETE",
            }),
        }),


        // User Liked Product
        fetchUserLikedProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/user-liked-products/`,
            }),
        }),

        // Create Product Review
        createProductReview: builder.mutation({
            query: ({ productId, data }) => ({
                url: `${PRODUCTS_URL}/product/${productId}/create-review/`,
                method: "POST",
                body: data,
            }),
        }),

        // Update Product Review
        updateProductReview: builder.mutation({
            query: ({ reviewId, data }) => ({
                url: `${PRODUCTS_URL}/product/update-review/${reviewId}/`,
                method: "PUT",
                body: data,
            }),
        }),

        // Delete Product Review
        deleteProductReview: builder.mutation({
            query: (reviewId) => ({
                url: `${PRODUCTS_URL}/product/delete-review/${reviewId}/`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useFetchProdCategoryQuery,
    useFetchSingleProdCategoryQuery,
    useCreateProdCategoryMutation,
    useUpdateProdCategoryMutation,
    useDeleteProdCategoryMutation,

    useManageProductsQuery,
    useEditApprovalMutation,
    useRemoveProductMutation,

    useFetchAllProductsQuery,
    useFetchUserProductsQuery,
    useFetchSingleProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,

    useCreateProductLikeMutation,
    useRemoveProductLikeMutation,
    useFetchUserLikedProductsQuery,

    useCreateProductReviewMutation,
    useUpdateProductReviewMutation,
    useDeleteProductReviewMutation,
} = productsApi;
