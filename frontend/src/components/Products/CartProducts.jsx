import React from 'react';
import { useFetchMyCartQuery } from '../../store/features/cart/cartApi';

// Reusable Cart Item Component
const CartItem = ({ image, name, price, quantity }) => {
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
                    <span className="text-sm text-gray-500">${price} x {quantity}</span>
                </div>
            </div>
        </li>
    );
};

const CartProducts = () => {
    const { data, error, isLoading } = useFetchMyCartQuery();

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error fetching cart!</div>;

    const cartItems = data?.cart_products || [];

    return (
        <div className="absolute right-0 bg-white shadow-lg border rounded-lg w-72 p-4 z-50">
            <h3 className="text-lg font-semibold mb-3 text-green-700">My Cart</h3>
            {cartItems.length > 0 ? (
                <ul className="space-y-3">
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            image={item.product.main_image}
                            name={item.product.title}
                            price={item.product.price}
                            quantity={item.quantity}
                        />
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
            <a href="/cart" className="mt-4 w-full text-sm bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 block text-center">
                View In Cart
            </a>
        </div>
    );
};

export default CartProducts;
