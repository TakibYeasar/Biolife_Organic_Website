import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useFetchFeaturedQuery } from '../../store/features/core/coreApi';

const Features = () => {
  const { data: featureds, error, isLoading } = useFetchFeaturedQuery();
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [featureds]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading featured items.</div>;
  }

  return (
    <section className="py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Featured Items</h2>
      </div>

      <motion.div className="overflow-hidden">
        <motion.ul
          ref={carousel}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex space-x-6 px-4 md:px-6 lg:px-8"
        >
          {featureds.map((item) => (
            <motion.li key={item.id} className="relative min-w-[300px]">
              <div className="overflow-hidden rounded-xl shadow-lg bg-white transition-transform transform hover:scale-105">
                <a href="#" className="block">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 object-cover transition-transform transform hover:scale-110"
                  />
                </a>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-40 text-white px-4 py-8">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm mt-2">{item.subtitle}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
};

export default Features;
