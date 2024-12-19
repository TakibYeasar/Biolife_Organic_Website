import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ProductCard, Topratedprod, Onsaleprod } from '../index';

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
  const [activeTab, setActiveTab] = useState('featured'); // Track active tab
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary mb-2">All the best items for you</p>
          <h2 className="text-4xl font-extrabold text-gray-800">Our Products</h2>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <ul className="flex justify-center space-x-8">
              <li
                className={`tab-element ${activeTab === 'featured' ? 'active' : ''}`}
                onClick={() => handleTabChange('featured')}
              >
                <a href="#tab_1st" className="tab-link text-lg font-medium text-gray-600 hover:text-primary transition duration-300">
                  Featured
                </a>
              </li>
              <li
                className={`tab-element ${activeTab === 'toprated' ? 'active' : ''}`}
                onClick={() => handleTabChange('toprated')}
              >
                <a href="#tab_2nd" className="tab-link text-lg font-medium text-gray-600 hover:text-primary transition duration-300">
                  Top Rated
                </a>
              </li>
              <li
                className={`tab-element ${activeTab === 'onsale' ? 'active' : ''}`}
                onClick={() => handleTabChange('onsale')}
              >
                <a href="#tab_3rd" className="tab-link text-lg font-medium text-gray-600 hover:text-primary transition duration-300">
                  On Sale
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Featured Products Tab */}
          {activeTab === 'featured' && (
            <motion.div id="tab_1st" className="tab-contain">
              <motion.ul
                ref={carousel}
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className="flex overflow-x-auto space-x-6 py-4"
              >
                {allproducts.slice(0, 5).map((item) => (
                  <motion.li key={item.id} className="flex-none w-1/3 sm:w-1/4 md:w-1/5 p-2">
                    <ProductCard item={item} />
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}

          {/* Top Rated Products Tab */}
          {activeTab === 'toprated' && <Topratedprod />}

          {/* On Sale Products Tab */}
          {activeTab === 'onsale' && <Onsaleprod />}
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
