import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../index';

// Dummy data for top-rated products
const dummyTopRatedProducts = [
    {
        product: [
            { id: 1, name: "Product 1", image: "https://via.placeholder.com/200", price: "$100" },
            { id: 2, name: "Product 2", image: "https://via.placeholder.com/200", price: "$150" },
            { id: 3, name: "Product 3", image: "https://via.placeholder.com/200", price: "$200" },
            { id: 4, name: "Product 4", image: "https://via.placeholder.com/200", price: "$250" },
            { id: 5, name: "Product 5", image: "https://via.placeholder.com/200", price: "$300" },
            { id: 6, name: "Product 6", image: "https://via.placeholder.com/200", price: "$350" },
        ],
    },
];

const Topratedprod = () => {
    const carousel = useRef();
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }, []);

    return (
        <div className="py-12 px-4 sm:px-6 md:px-8 bg-bgGrey">
            <h2 className="text-main-title font-bold text-center mb-8">Top Rated Products</h2>

            <motion.div className="overflow-hidden">
                <motion.ul
                    ref={carousel}
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="flex space-x-6 overflow-x-scroll scrollbar-hide"
                >
                    {dummyTopRatedProducts.map((topratedItem) => (
                        topratedItem.product.map((productItem) => (
                            <motion.li key={productItem.id} className="w-64 sm:w-72 md:w-80 lg:w-96 flex-shrink-0 rounded-lg shadow-lg bg-white">
                                <ProductCard item={productItem} />
                            </motion.li>
                        ))
                    ))}
                </motion.ul>
            </motion.div>
        </div>
    );
};

export default Topratedprod;
