import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../index';

// Dummy data for onsale products
const onsaleprod = [
    {
        id: 1,
        product: [
            {
                id: 1,
                title: 'Product One',
                description: 'This is a description for product one.',
                image: 'https://via.placeholder.com/150?text=Product+One',
                price: 29.99,
            },
            {
                id: 2,
                title: 'Product Two',
                description: 'This is a description for product two.',
                image: 'https://via.placeholder.com/150?text=Product+Two',
                price: 39.99,
            },
            {
                id: 3,
                title: 'Product Three',
                description: 'This is a description for product three.',
                image: 'https://via.placeholder.com/150?text=Product+Three',
                price: 49.99,
            },
            {
                id: 4,
                title: 'Product Four',
                description: 'This is a description for product four.',
                image: 'https://via.placeholder.com/150?text=Product+Four',
                price: 59.99,
            },
        ],
    },
];

const Onsaleprod = () => {
    const carousel = useRef();
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }, []);

    return (
        <motion.div id="tab_3rd" className="py-8">
            <motion.h2 className="text-2xl font-semibold mb-4">On Sale Products</motion.h2>
            <motion.div
                ref={carousel}
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                className="overflow-x-hidden"
            >
                <motion.ul className="product-list flex space-x-4">
                    {onsaleprod.map((onsaleprodItem) =>
                        onsaleprodItem.product.map((productItem) => (
                            <motion.li
                                key={productItem.id}
                                className="product-item w-64 sm:w-72 lg:w-80 xl:w-96"
                            >
                                <ProductCard item={productItem} />
                            </motion.li>
                        ))
                    )}
                </motion.ul>
            </motion.div>
        </motion.div>
    );
};

export default Onsaleprod;
