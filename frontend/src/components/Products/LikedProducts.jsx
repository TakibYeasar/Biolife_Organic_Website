import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import {
    useFetchUserLikedProductsQuery,
    useRemoveProductLikeMutation,
} from "../../store/features/products/productsApi";

// Reusable Product Component
const LikedProdItem = ({ product, isLiked, onRemoveLike, onViewDetails }) => {
    const { main_image, title, price, id } = product;

    return (
        <li className="flex items-center justify-between space-x-3 hover:bg-gray-100 p-2 rounded-lg transition duration-200">
            <div className="flex items-center">
                <img
                    src={main_image}
                    alt={title}
                    className="w-12 h-12 rounded-md mr-3 hover:scale-105 transition-transform duration-300"
                />
                <div>
                    <h4
                        onClick={() => onViewDetails(id)}
                        className="text-sm font-medium text-gray-800 hover:text-gray-900 cursor-pointer transition-colors duration-200"
                    >
                        {title}
                    </h4>
                    <span className="text-sm text-gray-500">{`£${price}`}</span>
                </div>
            </div>
            <button
                className="p-2 bg-transparent border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                onClick={() => onRemoveLike(id)}
                aria-label={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
            >
                <FaHeart className={`text-xl ${isLiked ? "text-red-500" : "text-gray-600"}`} />
            </button>
        </li>
    );
};

const LikedProducts = () => {
    const { data: likedProducts, isLoading, error } = useFetchUserLikedProductsQuery();
    const [removeProductLike] = useRemoveProductLikeMutation();

    // Handle remove like functionality
    const handleRemoveLike = async (productId) => {
        try {
            await removeProductLike(productId);
        } catch (error) {
            console.error("Error removing product like:", error);
        }
    };

    // Navigate to product details page
    const handleViewDetails = (productId) => {
        if (productId) {
            window.location.href = `/product/${productId}`;
        } else {
            console.error("Product ID is missing");
        }
    };

    if (isLoading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-600">Error loading liked products!</div>;
    }

    return (
        <div className="absolute right-0 bg-white shadow-lg border rounded-lg w-72 p-4 z-50">
            <h3 className="text-lg font-semibold mb-3 text-green-700 hover:text-green-800 transition-colors duration-200">
                Liked Products
            </h3>
            <ul className="space-y-3">
                {likedProducts && likedProducts.length > 0 ? (
                    likedProducts.map((product) => (
                        <LikedProdItem
                            key={product.id}
                            product={product}
                            isLiked={true} // Assuming all liked products are marked as liked
                            onRemoveLike={handleRemoveLike}
                            onViewDetails={handleViewDetails}
                        />
                    ))
                ) : (
                    <li className="text-center text-gray-500">No liked products found.</li>
                )}
            </ul>
            <button
                className="mt-4 w-full text-sm bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 transition duration-200"
                onClick={() => (window.location.href = "/liked-products")}
            >
                View All Liked Products
            </button>
        </div>
    );
};

export default LikedProducts;
