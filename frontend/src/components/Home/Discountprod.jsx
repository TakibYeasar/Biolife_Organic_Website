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
    <div className="py-8">
      {discountProducts.map((discountprodItem) => (
        <div key={discountprodItem.id} className="my-6">
          {discountprodItem.product.map((productItem) => (
            <div key={productItem.id} className="relative bg-white border rounded-lg shadow-lg overflow-hidden mb-4">
              <a href="#" className="block">
                <img src={productItem.main_image.image} alt={productItem.title} className="h-48 w-full object-cover" />
              </a>
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4">
                <h2 className="text-lg font-bold text-center uppercase">{productItem.title}</h2>
                <p className="text-lg">
                  Only: <span className="font-bold">{discountprodItem.discounted_price}</span>
                </p>
                <a href="#" className="btn btn-primary mt-2">Shop Now</a>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Discountprod;
