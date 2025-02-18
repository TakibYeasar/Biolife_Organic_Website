import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useFetchBrandsQuery } from '../../store/features/core/coreApi';

const Companies = () => {
  const { data: brands, error, isLoading } = useFetchBrandsQuery();
  const carousel = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [brands]);

  if (isLoading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
  }

  return (
    <section className="">
      <div className="text-center mb-8">
        <h2 className="main-title">Our Partners</h2>
      </div>

      <motion.div ref={carousel} className="overflow-hidden">
        <motion.ul
          className="flex space-x-6 px-6 md:px-12 lg:px-20"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          animate={{ x: [0, -width] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        >
          {brands.concat(brands).map((item, index) => (
            <motion.li key={index} className="min-w-[150px] md:min-w-[180px]">
              <div className="p-4 rounded-lg flex justify-center items-center">
                <img
                  src={item.logo}
                  alt={`Brand ${item.id}`}
                  className="w-48 h-48 object-contain"
                />
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
};

export default Companies;
