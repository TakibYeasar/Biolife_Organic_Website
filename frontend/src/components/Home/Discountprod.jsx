import React from 'react';

// Dummy data for discount products
const discountProducts = [
  {
    id: 1,
    discount: '20% Off',
    discounted_price: '$20',
    product: [
      {
        id: 101,
        title: 'Discounted Product 1',
        main_image: { image: 'https://via.placeholder.com/300x200?text=Product+1' },
      },
      {
        id: 102,
        title: 'Discounted Product 2',
        main_image: { image: 'https://via.placeholder.com/300x200?text=Product+2' },
      },
    ],
  },
  {
    id: 2,
    discount: '15% Off',
    discounted_price: '$15',
    product: [
      {
        id: 201,
        title: 'Discounted Product 3',
        main_image: { image: 'https://via.placeholder.com/300x200?text=Product+3' },
      },
      {
        id: 202,
        title: 'Discounted Product 4',
        main_image: { image: 'https://via.placeholder.com/300x200?text=Product+4' },
      },
    ],
  },
];

const Discountprod = () => {
  // Flatten products from discountProducts for a single list
  const allProducts = discountProducts.flatMap((item) =>
    item.product.map((product) => ({
      ...product,
      discount: item.discount,
      discounted_price: item.discounted_price,
    }))
  );

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Discounted Products</h2>

        {/* Grid Layout */}
        <div className="grid gap-8">
          {allProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Content */}
              <div className="p-6 text-center">
                <span className="block text-sm font-bold text-yellow-500 mb-2">
                  {product.discount}
                </span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
                <p className="text-lg text-gray-600">
                  Only: <span className="font-bold">{product.discounted_price}</span>
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block bg-primary text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-opacity-80 transition duration-200"
                >
                  Shop Now
                </a>
              </div>

              {/* Product Image */}
              <a href="#" className="block">
                <img
                  src={product.main_image.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Discountprod;
