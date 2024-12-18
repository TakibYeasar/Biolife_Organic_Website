import React from 'react';
import p11 from '/assets/images/products/p-11.jpg';
import p12 from '/assets/images/products/p-12.jpg';
import p13 from '/assets/images/products/p-13.jpg';
import p14 from '/assets/images/products/p-14.jpg';
import p15 from '/assets/images/products/p-15.jpg';

// Dummy data for recently viewed products
const prodTwo = [
    {
        image: p11,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        category: "Fresh Fruit",
        price: "450",
        old_price: "900",
    },
    {
        image: p12,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        category: "Fresh Fruit",
        price: "450",
        old_price: "900",
    },
    {
        image: p13,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        category: "Fresh Fruit",
        price: "450",
        old_price: "900",
    },
    {
        image: p14,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        category: "Fresh Fruit",
        price: "450",
        old_price: "900",
    },
    {
        image: p15,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        category: "Fresh Fruit",
        price: "450",
        old_price: "900",
    },
];

const RecentlyViewed = () => {
    return (
        <div className="widget bg-white p-4 rounded-lg shadow">
            <h4 className="text-lg font-semibold mb-4">Recently Viewed</h4>
            <div className="wgt-content">
                <ul className="grid grid-cols-2 gap-4">
                    {prodTwo.map((item, index) => (
                        <li key={index} className="pr-item">
                            <div className="contain-product bg-gray-100 p-2 rounded-md">
                                <div className="product-thumb">
                                    <a href="#" className="link-to-product">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            width={270}
                                            height={270}
                                            className="product-thumbnail rounded-md"
                                        />
                                    </a>
                                </div>
                                <div className="info text-center mt-2">
                                    <b className="categories text-sm text-gray-500">{item.category}</b>
                                    <h4 className="product-title">
                                        <a href="#" className="pr-name text-md font-medium hover:text-blue-500 transition duration-200">{item.title}</a>
                                    </h4>
                                    <div className="price mt-1">
                                        <ins>
                                            <span className="price-amount font-bold text-blue-600">
                                                <span className="currencySymbol">£</span>{item.price}
                                            </span>
                                        </ins>
                                        <del>
                                            <span className="price-amount text-gray-400 line-through">
                                                <span className="currencySymbol">£</span>{item.old_price}
                                            </span>
                                        </del>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RecentlyViewed;
