import React from 'react';
import { useFetchDiscountProductQuery } from '../../store/features/products/productsApi';

const Discountprod = () => {
  // Fetch discounted products using Redux
  const { data: discountedProducts, isLoading, error } = useFetchDiscountProductQuery();

  if (isLoading) {
    return <p className="text-center text-lg font-medium text-gray-600">Loading discounted products...</p>;
  }

  if (error) {
    return <p className="text-center text-lg font-medium text-red-600">Failed to load products. Please try again later.</p>;
  }

  // Limit to a maximum of 3 products
  const productsToDisplay = discountedProducts?.slice(0, 3) || [];

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Discounted Products</h2>

        {/* Column Layout */}
        <div className="flex flex-col gap-8">
          {productsToDisplay.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Image */}
              <a href="#" className="block">
                <img
                  src={product.product.main_image}
                  alt={product.product.title}
                  className="w-full h-48 object-cover"
                />
              </a>

              {/* Product Content */}
              <div className="p-6 text-center">
                <span className="block text-sm font-bold text-yellow-500 mb-2">
                  {product.discount_percentage}% Off
                </span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.product.title}</h3>
                <p className="text-lg text-gray-600">
                  Only: <span className="font-bold">${product.product.price}</span>
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block bg-primary text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-opacity-80 transition duration-200"
                >
                  Shop Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Discountprod;
