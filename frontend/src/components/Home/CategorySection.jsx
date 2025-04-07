import React, { useState } from 'react';
import { FaAngleRight, FaBars, FaCaretDown } from "react-icons/fa";
import { useFetchProdCategoryQuery } from '../../store/features/products/productsApi';

const CategorySection = () => {
    const { data: categories = [], isLoading, isError } = useFetchProdCategoryQuery();
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [isOpen, setIsOpen] = useState(true);

    const handleMouseEnter = (id) => {
        setHoveredCategory(id);
    };

    const handleMouseLeave = () => {
        setHoveredCategory(null);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading categories</div>;

    return (
        <div className="lg:block md:block col-lg-3 col-md-4 w-full max-h-screen relative z-20">
            <div className="bg-white border border-borderColorLight rounded-lg shadow-lg relative">
                {/* Header */}
                <div
                    className="flex items-center bg-navColor p-4 rounded-t-lg cursor-pointer"
                    onClick={toggleMenu}
                >
                    <FaBars className="text-fontLight text-2xl mr-3" />
                    <span className="text-fontLight text-lg font-semibold flex-1">All Departments</span>
                    <FaCaretDown className={`text-fontLight text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Category List */}
                {isOpen && (
                    <div className="p-4">
                        <ul className="space-y-2">
                            {categories.map((category) => (
                                <li
                                    key={category.id}
                                    className="relative border-b border-borderColorLight pb-2 group"
                                    onMouseEnter={() => handleMouseEnter(category.id)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <a
                                        href="#"
                                        className="flex items-center text-fontColor font-medium text-base hover:text-primary"
                                    >
                                        {category.name}
                                        {category.children && category.children.length > 0 && (
                                            <FaAngleRight className="ml-auto text-fontColor group-hover:text-primary transition-colors" />
                                        )}
                                    </a>
                                    {/* Children Dropdown */}
                                    {category.children && category.children.length > 0 && hoveredCategory === category.id && (
                                        <ul className="absolute left-full top-0 mt-0 bg-white border border-borderColorLight rounded-lg shadow-lg w-48 z-30">
                                            {category.children.map((child) => (
                                                <li key={child.id} className="p-2 hover:bg-gray-100">
                                                    <a
                                                        href="#"
                                                        className="text-fontColor font-medium text-sm hover:text-primary"
                                                    >
                                                        {child.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategorySection;
