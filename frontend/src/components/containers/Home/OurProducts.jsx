import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ProductCard, Topratedprod, Onsaleprod } from '../../../components';

// Dummy data for products
const allproducts = [
  {
    id: 1,
    name: 'Product One',
    description: 'Description of Product One',
    price: '$29.99',
    image: 'https://via.placeholder.com/150?text=Product+One',
  },
  {
    id: 2,
    name: 'Product Two',
    description: 'Description of Product Two',
    price: '$39.99',
    image: 'https://via.placeholder.com/150?text=Product+Two',
  },
  {
    id: 3,
    name: 'Product Three',
    description: 'Description of Product Three',
    price: '$49.99',
    image: 'https://via.placeholder.com/150?text=Product+Three',
  },
  {
    id: 4,
    name: 'Product Four',
    description: 'Description of Product Four',
    price: '$59.99',
    image: 'https://via.placeholder.com/150?text=Product+Four',
  },
  {
    id: 5,
    name: 'Product Five',
    description: 'Description of Product Five',
    price: '$69.99',
    image: 'https://via.placeholder.com/150?text=Product+Five',
  },
  // Add more products as needed
];

const OurProducts = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <div className="products-sec my-8">
      <div className="container mx-auto">
        <div className="prod-heading text-center mb-6">
          <p className="subtitle italic text-gray-500">All the best items for you</p>
          <p className="main-title text-3xl font-bold">Our Products</p>
        </div>

        <div className="prod-categories sm:mt-6">
          <div className="tab-head text-center mb-4">
            <ul className="tabs flex justify-center space-x-4">
              <li className="tab-element active">
                <a href="#tab_1st" className="tab-link text-lg font-medium">Featured</a>
              </li>
              <li className="tab-element">
                <a href="#tab_2nd" className="tab-link text-lg font-medium">Top Rated</a>
              </li>
              <li className="tab-element">
                <a href="#tab_3rd" className="tab-link text-lg font-medium">On Sale</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="tab-content">
          <motion.div id="tab_1st" className="tab-contain active">
            <motion.ul
              ref={carousel}
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              className="product-list flex overflow-x-auto space-x-4"
            >
              {allproducts.slice(0, 5).map((item, i) => (
                <motion.li key={item.id} className="product-item flex-none w-1/3 sm:w-1/5 p-2">
                  <ProductCard item={item} />
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <Topratedprod />
          <Onsaleprod />
        </div>
      </div>
    </div>
  );
};

export default OurProducts;
