import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Dummy data for categories
const categories = [
  {
    id: 1,
    cat_name: 'Fruits',
    product_count: 120,
    image: 'https://via.placeholder.com/150?text=Fruits',
  },
  {
    id: 2,
    cat_name: 'Vegetables',
    product_count: 95,
    image: 'https://via.placeholder.com/150?text=Vegetables',
  },
  {
    id: 3,
    cat_name: 'Dairy',
    product_count: 80,
    image: 'https://via.placeholder.com/150?text=Dairy',
  },
  {
    id: 4,
    cat_name: 'Snacks',
    product_count: 60,
    image: 'https://via.placeholder.com/150?text=Snacks',
  },
];

const FeaturedCategory = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <div className="py-8">
      <div className="text-center mb-6">
        <p className="text-primary mb-2">HOT CATEGORIES 2019</p>
        <h4 className="text-3xl font-bold">Featured Categories</h4>
        <p className="italic max-w-xl mx-auto">
          Natural food is taken from the world's most modern farms with strict safety cycles
        </p>
      </div>

      <motion.div className="overflow-hidden">
        <motion.div
          ref={carousel}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex space-x-4"
        >
          {categories.map((item, i) => (
            <motion.div key={i} className="flex-none w-1/4">
              <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <a href="#" className="block">
                  <img src={item.image} alt={item.cat_name} className="w-full h-32 object-cover" />
                </a>
                <div className="p-4 text-center">
                  <a href="#" className="no-underline">
                    <h4 className="text-lg font-semibold">{item.cat_name}</h4>
                    <span className="text-gray-500">({item.product_count} items)</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturedCategory;
