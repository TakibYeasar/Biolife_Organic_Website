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
        <div className="allblog-sec">
            <div className="breadcrumb relative">
                <img src={bg} alt="" className="h-[30vh] w-full object-cover" />
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                    Organic Fruits
                </h1>
            </div>
            <div className="container mx-auto px-4">
                <div className="boillife-nav flex space-x-2">
                    <a href="/" className="text-lg font-medium text-gray-700">Home</a>
                    <span>/</span>
                    <a href="/Articleslist" className="text-lg font-medium text-gray-700">Our Blog</a>
                </div>

                <div className="page-contain blog-page mt-4">
                    <div className="posts-elem main-post-list flex flex-wrap">
                        {articles.map((item) => (
                            <div key={item.id} className="articles-item w-full md:w-1/3 p-2">
                                <ArticleCard item={item} />
                            </div>
                        ))}
                    </div>

                    <div className="biolife-panigations-block text-center mt-4">
                        <div className="panigation-contain flex justify-center items-center space-x-2">
                            <div><span className="current-page text-lg font-semibold">1</span></div>
                            <div><a href="#" className="link-page text-lg text-blue-600">2</a></div>
                            <div><a href="#" className="link-page text-lg text-blue-600">3</a></div>
                            <div><span className="sep">....</span></div>
                            <div><a href="#" className="link-page text-lg text-blue-600">20</a></div>
                            <div><a href="#" className="link-page next text-lg text-blue-600"><FaAngleRight aria-hidden="true" /></a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Articles;
