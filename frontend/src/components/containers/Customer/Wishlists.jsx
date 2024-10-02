import React, { useState } from 'react';

// Sample product data
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
        <div className="p-6 bg-base-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>

            {wishlistItems.length === 0 ? (
                <p className="text-gray-500">Your wishlist is currently empty.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="card bg-base-200 shadow-lg p-4">
                            <figure>
                                <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.name}</h2>
                                <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={() => alert(`Added ${item.name} to cart!`)}>
                                        Add to Cart
                                    </button>
                                    <button className="btn btn-error" onClick={() => removeFromWishlist(item.id)}>
                                        Remove
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
