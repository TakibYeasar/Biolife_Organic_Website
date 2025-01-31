import { apiSlice } from "../../api/api";
import { CART_URL } from "../../constant";

export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Add product to cart
        addToCart: builder.mutation({
            query: (productData) => ({
                url: `${CART_URL}/add-to-cart/`,
                method: "POST",
                body: productData,
            }),
        }),

        // Fetch the user's cart
        fetchMyCart: builder.query({
            query: () => ({
                url: `${CART_URL}/my-cart/`,
                method: "GET",
            }),
        }),

        // Increase cart product quantity
        increaseCartProduct: builder.mutation({
            query: (cartProductId) => ({
                url: `${CART_URL}/increase-cart-product/`,
                method: "POST",
                body: { id: cartProductId },
            }),
        }),

        // Decrease cart product quantity
        decreaseCartProduct: builder.mutation({
            query: (cartProductId) => ({
                url: `${CART_URL}/decrease-cart-product/`,
                method: "POST",
                body: { id: cartProductId },
            }),
        }),

        // Delete a cart product
        deleteCartProduct: builder.mutation({
            query: (cartProductId) => ({
                url: `${CART_URL}/delete-cart-product/${cartProductId}/`,
                method: "DELETE",
            }),
        }),

        // Delete the entire cart
        deleteFullCart: builder.mutation({
            query: () => ({
                url: `${CART_URL}/delete-full-cart/`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useAddToCartMutation,
    useFetchMyCartQuery,
    useIncreaseCartProductMutation,
    useDecreaseCartProductMutation,
    useDeleteCartProductMutation,
    useDeleteFullCartMutation,
} = cartApi;
