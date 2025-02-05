import React, { useState, useEffect } from "react";
import { FaEye, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
    useCreateProductLikeMutation,
    useRemoveProductLikeMutation,
} from "../../store/features/products/productsApi";
import { useCurrentUserQuery } from "../../store/features/auth/authApi";
import { useAddToCartMutation } from "../../store/features/cart/cartApi";
import { toast } from "react-toastify";

const ProductCard = ({ item }) => {
    const navigate = useNavigate();

    // Fetch the current user
    const { data: user } = useCurrentUserQuery();

    // Like and Unlike mutations
    const [createProductLike] = useCreateProductLikeMutation();
    const [removeProductLike] = useRemoveProductLikeMutation();

    // Add to cart mutation
    const [addToCart] = useAddToCartMutation();

    // State to track if the product is liked
    const [isLiked, setIsLiked] = useState(false);

    // Check if the product is liked by the current user
    useEffect(() => {
        if (user && item?.likes?.includes(user.id)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [user, item]);

    // Handle like/unlike functionality
    const handleLike = async () => {
        try {
            if (isLiked) {
                await removeProductLike(item?.id).unwrap();
                toast.success("Removed from wishlist");
            } else {
                await createProductLike(item?.id).unwrap();
                toast.success("Added to wishlist");
            }
            setIsLiked(!isLiked); // Toggle the like state
        } catch (error) {
            toast.error("Failed to update wishlist");
        }
    };

    // Handle adding product to cart
    const handleAddToCart = async () => {
        try {
            await addToCart(item?.id).unwrap();
            toast.success("Added to cart");
        } catch (error) {
            toast.error("Failed to add to cart");
        }
    };

    // Navigate to product details page
    const handleProductDetails = () => {
        if (item?.id) {
            navigate(`/product/${item.id}`);
        } else {
            console.error("Product ID is missing");
        }
    };

    return (
        <div className="group w-64 bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
            {/* Product Image */}
            <div className="relative">
                <button onClick={handleProductDetails} className="w-full">
                    <img
                        src={item?.main_image}
                        alt={item?.title}
                        className="h-64 w-full object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-300"
                    />
                </button>
            </div>

            {/* Product Information */}
            <div className="p-4 text-center">
                <p className="text-sm text-gray-500">{item?.category}</p>
                <h4 className="text-lg font-semibold text-gray-800 mt-2 mb-4">
                    <button
                        onClick={handleProductDetails}
                        className="hover:text-primary transition-colors duration-300"
                    >
                        {item?.title}
                    </button>
                </h4>
                <div className="flex justify-center items-baseline my-2 space-x-2">
                    <span className="text-lg font-bold text-gray-800">£{item?.price}</span>
                    {item?.old_price && (
                        <span className="text-sm text-gray-500 line-through">£{item?.old_price}</span>
                    )}
                </div>

                {/* Hover Actions */}
                <div className="hidden group-hover:block mt-4 space-y-4">
                    <div className="flex justify-center space-x-3">
                        {/* Like Button */}
                        <button
                            className="p-2 bg-transparent border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                            onClick={handleLike}
                            aria-label={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                            <FaHeart className={`text-xl ${isLiked ? "text-red-500" : "text-gray-600"}`} />
                        </button>

                        {/* Add to Cart Button */}
                        <button
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>

                        {/* View Details Button */}
                        <button
                            className="p-2 bg-transparent border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                            onClick={handleProductDetails}
                            aria-label="View Details"
                        >
                            <FaEye className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;