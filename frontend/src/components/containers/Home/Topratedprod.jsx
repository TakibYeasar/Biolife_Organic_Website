import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../../../components'; // Assuming ProductCard is your product display component

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
        <div className="py-12">
            <motion.div className="overflow-hidden">
                <motion.ul
                    ref={carousel}
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="flex space-x-4"
                >
                    {dummyTopRatedProducts.map((topratedItem, index) => (
                        topratedItem.product.map((productItem) => (
                            <motion.li key={productItem.id} className="w-48 flex-shrink-0">
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
