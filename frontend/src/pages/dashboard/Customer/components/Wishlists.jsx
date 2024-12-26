import React, { useState } from 'react';
import { FaTrash, FaCartPlus } from 'react-icons/fa';

const sampleWishlistItems = [
    {
        id: 1,
        name: 'Organic Avocados',
        price: 3.99,
        image: 'https://example.com/images/avocados.jpg',
    },
    {
        id: 2,
        name: 'Quinoa',
        price: 4.99,
        image: 'https://example.com/images/quinoa.jpg',
    },
    {
        id: 3,
        name: 'Almond Milk',
        price: 2.49,
        image: 'https://example.com/images/almond-milk.jpg',
    },
];

const Wishlists = () => {
    const [wishlistItems, setWishlistItems] = useState(sampleWishlistItems);

    const removeFromWishlist = (id) => {
        const updatedWishlist = wishlistItems.filter(item => item.id !== id);
        setWishlistItems(updatedWishlist);
    };

    return (
        <div className="p-5 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

            {wishlistItems.length === 0 ? (
                <p className="text-gray-500">Your wishlist is currently empty.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="bg-gray-100 shadow-md p-4 rounded-lg">
                            <figure>
                                <img src={item.image} alt={item.name} className="h-40 w-full object-cover rounded" />
                            </figure>
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                                <div className="mt-4 space-x-2">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                        onClick={() => alert(`Added ${item.name} to cart!`)}
                                    >
                                        <FaCartPlus /> Add to Cart
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => removeFromWishlist(item.id)}
                                    >
                                        <FaTrash /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlists;
