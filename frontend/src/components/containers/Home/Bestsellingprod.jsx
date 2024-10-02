import React, { useEffect, useState, useRef } from 'react';
import { motion } from "framer-motion";
import {ProductCard} from "../../../components";

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
    <div className="my-10">
      <div className="text-center mb-5">
        <h3 className="text-2xl font-bold">Bestselling Products</h3>
      </div>

      <motion.div className="overflow-hidden">
        <motion.ul
          ref={carousel}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex"
        >
          {bestsellingprod.map((bestsellingprodItem, index) => (
            bestsellingprodItem.product.map((productItem) => (
              <motion.li
                key={productItem.id}
                className="flex-shrink-0 w-60 mx-2 p-4 border rounded-lg shadow-lg transition-transform duration-200 hover:scale-105"
              >
                <ProductCard item={productItem} />
              </motion.li>
            ))
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default Bestsellingprod;
