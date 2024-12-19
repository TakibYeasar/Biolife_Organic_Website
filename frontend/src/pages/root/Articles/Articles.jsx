import React from 'react';
import { FaAngleRight } from "react-icons/fa";
import bg from "/assets/images/home/biolife-banner__style-01.jpg";
import { ArticleCard } from '../../../components';

// Dummy data for articles
const articles = [
    {
        id: 1,
        title: "The Benefits of Organic Fruits",
        excerpt: "Discover the health benefits of incorporating organic fruits into your diet.",
    },
    {
        id: 2,
        title: "Seasonal Organic Fruits to Try",
        excerpt: "Explore the best seasonal organic fruits and how to enjoy them.",
    },
    {
        id: 3,
        title: "How to Choose Organic Fruits",
        excerpt: "Learn tips on selecting the freshest organic fruits at the market.",
    },
    // Add more dummy articles as needed
];

const Articles = () => {
    return (
        <div className="bg-white">
            {/* Breadcrumb Section */}
            <div className="relative">
                <img src={bg} alt="Banner" className="w-full h-[30vh] object-cover" />
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold text-white text-center">
                    Organic Fruits
                </h1>
            </div>

            {/* Breadcrumb Navigation */}
            <div className="container mx-auto px-4 mt-6">
                <nav className="flex items-center space-x-2 text-lg font-medium text-gray-700">
                    <a href="/" className="hover:text-blue-600">Home</a>
                    <span className="text-gray-500">/</span>
                    <a href="/Articleslist" className="hover:text-blue-600">Our Blog</a>
                </nav>
            </div>

            {/* Blog Content */}
            <div className="container mx-auto px-4 mt-6">
                <div className="flex flex-wrap -mx-2">
                    {articles.map((item) => (
                        <div key={item.id} className="w-full md:w-1/3 px-2 mb-6">
                            <ArticleCard item={item} />
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="text-center mt-8">
                    <div className="flex justify-center items-center space-x-3">
                        <div>
                            <span className="text-lg font-semibold">1</span>
                        </div>
                        <div>
                            <a href="#" className="text-lg text-blue-600 hover:text-blue-800">2</a>
                        </div>
                        <div>
                            <a href="#" className="text-lg text-blue-600 hover:text-blue-800">3</a>
                        </div>
                        <div>
                            <span className="text-gray-500">...</span>
                        </div>
                        <div>
                            <a href="#" className="text-lg text-blue-600 hover:text-blue-800">20</a>
                        </div>
                        <div>
                            <a href="#" className="text-lg text-blue-600 hover:text-blue-800">
                                <FaAngleRight aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Articles;
