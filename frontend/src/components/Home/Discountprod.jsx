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
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        {discountProducts.map((discountprodItem) => (
          <div key={discountprodItem.id} className="mb-12">
            {/* Discount Badge */}
            <div className="text-center mb-6">
              <span className="text-xl font-bold text-gray-800 bg-yellow-500 py-2 px-4 rounded-full">{discountprodItem.discount}</span>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {discountprodItem.product.map((productItem) => (
                <div key={productItem.id} className="relative bg-white border rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition duration-300">
                  {/* Product Image */}
                  <a href="#" className="block">
                    <img
                      src={productItem.main_image.image}
                      alt={productItem.title}
                      className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  </a>

                  {/* Product Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                    <h2 className="text-xl font-semibold text-center uppercase">{productItem.title}</h2>
                    <p className="text-lg mt-2">
                      Only: <span className="font-bold">{discountprodItem.discounted_price}</span>
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
        ))}
      </div>
    </section>
  );
};

export default Discountprod;
