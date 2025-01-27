import React, { useEffect, useState, useRef } from 'react';
import { motion } from "framer-motion";
import { ProductCard } from "../index";
import { useFetchBestsellingProductsQuery } from '../../redux/features/products/productsApi';

const Bestsellingprod = () => {
  const { data: bestsellingprod, error, isLoading } = useFetchBestsellingProductsQuery();
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  // console.log(bestsellingprod);

  useEffect(() => {
    if (carousel.current && bestsellingprod) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [bestsellingprod]);

  if (isLoading) {
    return <div className="text-center py-8 text-lg font-semibold text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-lg font-semibold text-red-500">Error: {error.message}</div>;
  }

  // Access the products directly from bestsellingprod
  const products = bestsellingprod || [];

  // Split products into two rows
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5);

  return (
    <section className="my-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Bestselling Products</h2>
      </div>

      <motion.div className="overflow-hidden">
        {/* First Row */}
        <motion.ul
          ref={carousel}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex space-x-6 px-4 md:px-6 lg:px-8 mb-8"
        >
          {firstRow.map((productItem) => (
            <motion.li
              key={productItem.id}
              className="flex-shrink-0"
            >
              <ProductCard item={productItem} />
            </motion.li>
          ))}
        </motion.ul>

        {/* Second Row */}
        <motion.ul
          ref={carousel}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex space-x-6 px-4 md:px-6 lg:px-8"
        >
          {secondRow.map((productItem) => (
            <motion.li
              key={productItem.id}
              className="flex-shrink-0"
            >
              <ProductCard item={productItem} />
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
};

export default Bestsellingprod;
