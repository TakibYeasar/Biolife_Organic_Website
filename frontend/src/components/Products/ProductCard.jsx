import React, { useState, useEffect } from "react";
import { FaEye, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
    useCreateProductLikeMutation,
    useRemoveProductLikeMutation
} from "../../redux/features/products/productsApi";
import { useCurrentUserQuery } from "../../redux/features/auth/authApi";

const ProductCard = ({ item }) => {
    const { data: user, isLoading, error } = useCurrentUserQuery();  // Fetch current user
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    // Redux hooks for like and unlike actions
    const [createProductLike] = useCreateProductLikeMutation();
    const [removeProductLike] = useRemoveProductLikeMutation();

    // Check if the product is liked on component mount or item update
    useEffect(() => {
        if (user && item?.likes?.includes(user.id)) {
            setIsLiked(true);  // Set to true if current user has liked the product
        } else {
            setIsLiked(false); // Set to false if current user has not liked the product
        }
    }, [user, item]);

    // Handle like/unlike functionality
    const handleLike = () => {
        if (isLiked) {
            removeProductLike(item?.id); // Remove like
        } else {
            createProductLike(item?.id); // Add like
        }
        setIsLiked(!isLiked); // Toggle the like state
    };

    // Navigate to product details page with product ID
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
                        <button
                            className="p-2 bg-transparent border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                            onClick={handleLike}
                            aria-label={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                            <FaHeart className={`text-xl ${isLiked ? 'text-red-500' : 'text-gray-600'}`} />
                        </button>
                        <button
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                        >
                            Add to Cart
                        </button>
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
