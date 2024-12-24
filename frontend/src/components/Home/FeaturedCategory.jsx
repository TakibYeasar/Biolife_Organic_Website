import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFetchCategoryQuery } from '../../redux/features/products/productsApi';

const FeaturedCategory = () => {
  const { data: categoriesData, error, isLoading } = useFetchCategoryQuery();
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [categoriesData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const categories = categoriesData || []; // Ensure categories is always an array

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-10">
        <p className="text-primary text-sm font-semibold mb-2">HOT CATEGORIES 2019</p>
        <h4 className="text-4xl font-extrabold text-gray-800 mb-4">Featured Categories</h4>
        <p className="italic text-lg max-w-3xl mx-auto text-gray-500">
          Natural food is taken from the world's most modern farms with strict safety cycles
        </p>
      </div>

      <motion.div className="overflow-hidden">
        <motion.div
          ref={carousel}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex space-x-6 overflow-x-auto py-4"
        >
          {categories.map((item) => (
            <motion.div key={item.id} className="flex-none w-64">
              <div className="border border-gray-300 rounded-xl shadow-lg overflow-hidden bg-white transition-all transform hover:scale-105 hover:shadow-xl">
                <a href="#" className="block">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                </a>
                <div className="p-6 text-center">
                  <a href="#" className="no-underline text-gray-800">
                    <h4 className="text-xl font-semibold">{item.name}</h4>
                    <span className="text-gray-500 text-sm">({item.product_count} items)</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturedCategory;
