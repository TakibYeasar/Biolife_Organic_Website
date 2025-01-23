import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../index';
import { useFetchAllProductsQuery, useFetchTopratedProductsQuery } from '../../redux/features/products/productsApi';

const OurProducts = () => {
  const { data: products, error: allProductsError, isLoading: allProductsLoading } = useFetchAllProductsQuery();
  const { data: topratedProducts, error: topratedError, isLoading: topratedLoading } = useFetchTopratedProductsQuery();
  const [width, setWidth] = useState(0);
  const [activeTab, setActiveTab] = useState('featured');
  const carousel = useRef();

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [products, topratedProducts]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (allProductsLoading || topratedLoading) {
    return <div className="text-center py-8 text-lg font-semibold text-gray-500">Loading...</div>;
  }

  if (allProductsError || topratedError) {
    return <div className="text-center py-8 text-lg font-semibold text-red-500">
      Error: {allProductsError?.message || topratedError?.message}
    </div>;
  }

  const featuredProducts = products?.slice(0, 8) || [];
  const topRatedProducts = topratedProducts?.slice(0, 8) || [];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary mb-2">Curated for You</p>
          <h2 className="text-3xl font-bold text-gray-800">Our Products</h2>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 text-center">
          <ul className="flex justify-center gap-6 text-lg font-medium">
            {['featured', 'toprated'].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-2 transition-all duration-300 ${activeTab === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary'
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'featured' && (
            <motion.div className="overflow-hidden">
              <motion.ul
                ref={carousel}
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className="flex gap-6 py-4"
              >
                {featuredProducts.map((item) => (
                  <motion.li key={item.id} className="flex-none w-1/3 sm:w-1/4 md:w-1/5">
                    <ProductCard item={item} />
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}

          {activeTab === 'toprated' && (
            <motion.div className="overflow-hidden">
              <motion.ul
                ref={carousel}
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className="flex gap-6 py-4"
              >
                {topRatedProducts.map((item) => (
                  <motion.li key={item.id} className="flex-none w-1/3 sm:w-1/4 md:w-1/5">
                    <ProductCard item={item} />
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
