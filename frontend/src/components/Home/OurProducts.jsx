import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ProductCard, Topratedprod, Onsaleprod } from '../index';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const OurProducts = () => {
  const { data: allProductsData, error, isLoading } = useFetchAllProductsQuery();
  const [width, setWidth] = useState(0);
  const [activeTab, setActiveTab] = useState('featured');
  const carousel = useRef();

  useEffect(() => {
    if (carousel.current && allProductsData?.length) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [allProductsData]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-primary">Error: {error.message}</div>;
  }

  const featuredProducts = allProductsData?.slice(0, 5) || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary mb-2">All the best items for you</p>
          <h2 className="text-4xl font-bold text-gray-800">Our Products</h2>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <ul className="flex justify-center gap-8">
            {['featured', 'toprated', 'onsale'].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-2 text-lg font-medium transition-colors ${activeTab === tab
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
          {/* Featured Products Tab */}
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

          {/* Top Rated Products Tab */}
          {activeTab === 'toprated' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <Topratedprod />
            </div>
          )}

          {/* On Sale Products Tab */}
          {activeTab === 'onsale' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <Onsaleprod />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
