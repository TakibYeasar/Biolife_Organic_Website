import React from 'react';
import { FaAngleRight, FaBars, FaCaretDown } from "react-icons/fa";

// Dummy data for categories
const categories = [
    { cat_name: "Electronics" },
    { cat_name: "Books" },
    { cat_name: "Clothing" },
    { cat_name: "Home & Garden" },
    { cat_name: "Sports" },
    { cat_name: "Toys" },
];

const Categorylist = () => {
    return (
        <div className="hidden lg:block md:block col-lg-3 col-md-4">
            <div className="border border-gray-300 rounded-lg shadow-md">
                <div className="flex items-center bg-blue-600 p-4 rounded-t-lg">
                    <FaBars className="text-white text-2xl mr-3" />
                    <span className="text-white text-lg font-semibold flex-1">All Departments</span>
                    <FaCaretDown className="text-white text-lg" />
                </div>

                <div className="p-4">
                    <ul className="space-y-2">
                        {categories.map((item, index) => (
                            <li key={index} className="border-b border-gray-200 pb-2">
                                <a href="#" className="flex items-center text-gray-700 font-medium text-base hover:text-blue-600">
                                    {item.cat_name}
                                    <FaAngleRight className="ml-auto text-gray-500" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Categorylist;
