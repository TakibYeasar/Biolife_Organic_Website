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
            <div className="bg-white border border-borderColorLight rounded-lg shadow-lg">
                {/* Header */}
                <div className="flex items-center bg-navColor p-4 rounded-t-lg">
                    <FaBars className="text-fontLight text-2xl mr-3" />
                    <span className="text-fontLight text-lg font-semibold flex-1">All Departments</span>
                    <FaCaretDown className="text-fontLight text-lg" />
                </div>

                {/* Category List */}
                <div className="p-4">
                    <ul className="space-y-2">
                        {categories.map((item, index) => (
                            <li key={index} className="border-b border-borderColorLight pb-2">
                                <a href="#" className="flex items-center text-fontColor font-medium text-base hover:text-primary">
                                    {item.cat_name}
                                    <FaAngleRight className="ml-auto text-fontColor" />
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
