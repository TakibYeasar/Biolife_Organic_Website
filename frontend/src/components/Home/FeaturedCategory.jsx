import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBeer, FaCalendarAlt, FaCarAlt } from 'react-icons/fa';
import { useFetchProdCategoryQuery } from '../../store/features/products/productsApi';

const FeaturedCategory = () => {
  const { data: categoriesData, error, isLoading } = useFetchProdCategoryQuery();
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef();

  useEffect(() => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const offsetWidth = carouselRef.current.offsetWidth;
      setCarouselWidth(scrollWidth - offsetWidth);
    }
  }, [categoriesData]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;

  const flattenCategories = (categories) => {
    const flatList = [];
    const traverse = (categoryList) => {
      categoryList.forEach((category) => {
        flatList.push(category);
        if (category.children?.length) traverse(category.children);
      });
    };
    traverse(categories);
    return flatList;
  };

  const categories = flattenCategories(categoriesData || []);

  return (
    <section className="py-16">
      <div className="text-center mb-10">
        <p className="text-primary text-sm font-semibold mb-2">HOT CATEGORIES 2023</p>
        <h4 className="text-4xl font-extrabold text-gray-800 mb-4">Featured Categories</h4>
        <p className="italic text-lg max-w-3xl mx-auto text-gray-500">
          Natural food is taken from the world's most modern farms with strict safety cycles.
        </p>
      </div>

      <motion.div
        ref={carouselRef}
        className="overflow-hidden cursor-grab"
        whileTap="grabbing"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -carouselWidth, right: 0 }}
          className="flex gap-6"
        >
          {categories.map((item) => (
            <motion.div
              key={item.id}
              className="flex-none w-64 bg-white rounded-xl border border-gray-200 shadow-lg transform hover:scale-105 transition-transform"
            >
              <a href="#" className="block">
                <img
                  src={item.image || 'https://via.placeholder.com/150'}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-t-xl"
                />
              </a>
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold text-gray-800">{item.name}</h4>
                <span className="text-sm text-gray-500">
                  ({item.product_count || 0} items)
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="mt-16">
        <ul className="flex flex-wrap justify-around border-2 border-gray-300 rounded-lg py-6 px-8 bg-white shadow-md">
          {[
            { icon: <FaBeer />, title: 'Full Stamped Product' },
            { icon: <FaCalendarAlt />, title: 'Place and Delivery on Time' },
            { icon: <FaCarAlt />, title: 'Free Shipping in the City' },
          ].map((item, index) => (
            <li key={index} className="flex items-center space-x-4">
              <span className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                {index + 1}
              </span>
              {item.icon}
              <a
                href="#"
                className="text-lg font-bold text-gray-800 uppercase hover:text-primary"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedCategory;
