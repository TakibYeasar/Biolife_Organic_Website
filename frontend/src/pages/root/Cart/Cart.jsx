import React from 'react';
import { FaCaretDown, FaCaretUp, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useFetchMyCartQuery } from '../../../redux/features/cart/cartApi';
import pr01 from "/assets/images/shippingcart/pr-01.jpg";
import pr02 from "/assets/images/shippingcart/pr-02.jpg";

const cartdata = [
  {
    image: pr01,
    title: "National Fresh Fruit",
    price: "245",
    old_price: "600",
    quantity: "3",
    subtotal: "735",
  },
  {
    image: pr02,
    title: "National Fresh Fruit",
    price: "245",
    old_price: "600",
    quantity: "2",
    subtotal: "490",
  },
];

const Cart = () => {

  const { data: cart, error, isLoading } = useFetchMyCartQuery();
  
    if (isLoading) {
      return <div className="text-center py-8">Loading...</div>;
    }
  
    if (error) {
      return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
  }
  

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-400 to-lime-500 py-10">
        <h1 className="text-center text-4xl font-extrabold text-white">
          Your Shopping Cart
        </h1>
      </div>

      <div className="container mx-auto py-12 px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <a href="/" className="hover:underline text-green-600">Home</a>
          <span className="mx-2">/</span>
          <a href="/cart" className="font-semibold text-gray-800">Shopping Cart</a>
        </nav>

        {/* Cart Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Your Cart Items
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-800 border-b">
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Subtotal</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartdata.map((item, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition">
                    <td className="py-4 px-4 flex items-center space-x-4">
                      <img
                        className="h-16 w-16 object-cover rounded-md"
                        src={item.image}
                        alt={item.title}
                      />
                      <div>
                        <h3 className="text-gray-800 font-semibold">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-through">
                          £{item.old_price}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700 font-semibold">
                      £{item.price}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
                        >
                          <FaCaretUp />
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-12 text-center border rounded"
                        />
                        <button
                          type="button"
                          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
                        >
                          <FaCaretDown />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700 font-semibold">
                      £{item.subtotal}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="Edit"
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap justify-between items-center mt-6">
            <a
              href="/"
              className="text-green-600 hover:text-green-800 font-semibold"
            >
              ← Continue Shopping
            </a>
            <div className="flex space-x-4">
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded shadow"
                type="submit"
                disabled
              >
                Update Cart
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow"
                type="reset"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
