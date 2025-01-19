import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBeer, FaCalendarAlt, FaCarAlt } from 'react-icons/fa';
import { useFetchProdCategoryQuery } from '../../redux/features/products/productsApi';

const FeaturedCategory = () => {
  const { data: categoriesData, error, isLoading } = useFetchProdCategoryQuery();
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

  // Flatten categories to include both parents and children
  const flattenCategories = (categories) => {
    const flatList = [];
    const traverse = (categoryList) => {
      categoryList.forEach((category) => {
        flatList.push(category);
        if (category.children && category.children.length > 0) {
          traverse(category.children);
        }
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
                    src={item.image || 'https://via.placeholder.com/150'}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                </a>
                <div className="p-6 text-center">
                  <a href="#" className="no-underline text-gray-800">
                    <h4 className="text-xl font-semibold">{item.name}</h4>
                    <span className="text-gray-500 text-sm">
                      ({item.product_count || 0} items)
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="mt-16">
        <ul className="flex justify-around border-2 border-gray-300 rounded-lg py-6 px-8 bg-white shadow-md">
          <li>
            <div className="flex items-center space-x-4">
              <span className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                1
              </span>
              <FaBeer className="text-2xl" />
              <a href="#" className="text-lg font-bold text-gray-800 uppercase hover:text-primary">
                Full Stamped Product
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center space-x-4">
              <span className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                2
              </span>
              <FaCalendarAlt className="text-2xl" />
              <a href="#" className="text-lg font-bold text-gray-800 uppercase hover:text-primary">
                Place and Delivery on Time
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center space-x-4">
              <span className="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                3
              </span>
              <FaCarAlt className="text-2xl" />
              <a href="#" className="text-lg font-bold text-gray-800 uppercase hover:text-primary">
                Free Shipping in the City
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default FeaturedCategory;
