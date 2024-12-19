import React, { useEffect, useState, useRef } from 'react';
import { motion } from "framer-motion";
import { ProductCard } from "../index";

// Dummy data
const bestsellingprod = [
  {
    product: [
      { id: 1, title: "Product 1", price: 29.99, image: "https://via.placeholder.com/150" },
      { id: 2, title: "Product 2", price: 39.99, image: "https://via.placeholder.com/150" },
      { id: 3, title: "Product 3", price: 49.99, image: "https://via.placeholder.com/150" },
      { id: 4, title: "Product 4", price: 19.99, image: "https://via.placeholder.com/150" },
      { id: 5, title: "Product 5", price: 59.99, image: "https://via.placeholder.com/150" },
      { id: 6, title: "Product 6", price: 79.99, image: "https://via.placeholder.com/150" },
    ]
  }
];

const Bestsellingprod = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <section className="my-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Bestselling Products</h2>
      </div>

      <motion.div className="overflow-hidden">
        <motion.ul
          ref={carousel}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex space-x-6 px-4 md:px-6 lg:px-8"
        >
          {bestsellingprod.map((bestsellingprodItem, index) => (
            bestsellingprodItem.product.map((productItem) => (
              <motion.li
                key={productItem.id}
                className="flex-shrink-0 w-60 sm:w-72 lg:w-80 xl:w-96 p-4 border border-gray-200 rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
              >
                <ProductCard item={productItem} />
              </motion.li>
            ))
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
};

export default Bestsellingprod;
