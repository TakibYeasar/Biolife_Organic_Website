import React from 'react';

// Reusable Product Component for Wishlist
const WishlistItem = ({ image, name, price }) => {
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

const Wishlists = () => {
    return (
        <div className="absolute top-14 right-0 bg-white shadow-lg border rounded-lg w-72 p-4 z-50">
            <h3 className="text-lg font-semibold mb-3 text-green-700">My Wishlist</h3>
            <ul className="space-y-3">
                <WishlistItem
                    image="/assets/images/product1.jpg"
                    name="Organic Spinach"
                    price="$2.99 / bunch"
                />
                <WishlistItem
                    image="/assets/images/product2.jpg"
                    name="Organic Kale"
                    price="$3.49 / bunch"
                />
                <WishlistItem
                    image="/assets/images/product3.jpg"
                    name="Fresh Carrots"
                    price="$1.99 / lb"
                />
            </ul>
            <button className="mt-4 w-full text-sm bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                View All Wishlist Items
            </button>
        </div>
    );
};

export default Wishlists;
