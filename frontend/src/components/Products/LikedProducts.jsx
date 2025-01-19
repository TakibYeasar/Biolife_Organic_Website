import React from 'react';
import { useFetchUserLikedProductsQuery } from '../../redux/features/products/productsApi';

// Reusable Product Component
const LikedProdItem = ({ image, name, price }) => {
    return (
        <li className="flex items-center justify-between space-x-3">
            <div className="flex items-center">
                <img
                    src={image}
                    alt={name}
                    className="w-12 h-12 rounded-md mr-3"
                />
                <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-800">{name}</h4>
                    <span className="text-sm text-gray-500">{price}</span>
                </div>
            </div>
            <button className="text-red-500 hover:text-red-700">
                <i className="fas fa-heart"></i> {/* Heart Icon */}
            </button>
        </li>
    );
};

const LikedProducts = () => {
    // Fetch liked products from Redux using the custom hook
    const { data: likedProducts, isLoading, error } = useFetchUserLikedProductsQuery();

    if (isLoading) {
        return <div>Loading...</div>; // Loading state
    }

    if (error) {
        return <div>Error loading liked products!</div>; // Error handling
    }

    return (
        <div className="absolute top-14 right-0 bg-white shadow-lg border rounded-lg w-72 p-4 z-50">
            <h3 className="text-lg font-semibold mb-3 text-green-700">Liked Products</h3>
            <ul className="space-y-3">
                {likedProducts && likedProducts.length > 0 ? (
                    likedProducts.map((product) => (
                        <LikedProdItem
                            key={product.id} // Ensure each item has a unique key
                            image={product.main_image} // Assuming product has a 'main_image' field
                            name={product.title} // Assuming product has a 'title' field
                            price={`£${product.price}`} // Assuming product has a 'price' field
                        />
                    ))
                ) : (
                    <li>No liked products found.</li>
                )}
            </ul>
            <button className="mt-4 w-full text-sm bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                View All Liked Products
            </button>
        </div>
    );
};

export default LikedProducts;
