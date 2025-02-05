import React from 'react';
import pr01 from '/assets/images/shippingcart/pr-01.jpg';
import pr02 from '/assets/images/shippingcart/pr-02.jpg';

const cartData = [
  {
    image: pr01,
    title: 'National Fresh Fruit',
    price: '85',
    old_price: '135',
    quantity: 1,
  },
  {
    image: pr02,
    title: 'Organic Berries',
    price: '85',
    old_price: '135',
    quantity: 1,
  },
];

const Checkout = () => {
  return (
    <section className="pt-32 p-8 bg-gray-50">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Address Form */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Address</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="Enter your city"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700 mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip_code"
                  placeholder="Enter your zip code"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                id="country"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Address
            </button>
          </form>
        </div>

        {/* Order Summary and Payment Section */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
          <ul className="divide-y divide-gray-200 mb-6">
            {cartData.map((item, i) => (
              <li key={i} className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded border border-gray-200 mr-4"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{item.title}</p>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-800">£{item.price}</p>
                  <p className="text-sm text-gray-500 line-through">£{item.old_price}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-sm border-t border-gray-200 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800">£170.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-800">£20.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-800">£0.00</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 text-lg font-semibold">
            <span>Total</span>
            <span className="text-gray-800">£190.00</span>
          </div>

          <button
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;