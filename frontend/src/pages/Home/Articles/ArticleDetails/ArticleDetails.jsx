import React, { useEffect, useState } from 'react';
import { FaComment, FaEye, FaFacebook, FaInstagram, FaPinterest, FaSearch, FaTwitter, FaYoutube } from "react-icons/fa";
import bg from "/assets/images/home/biolife-banner__style-01.jpg";
import author2 from "/assets/images/blogpost/author-02.png";
import { RecentComments, RecentPost, Articletags, Comments, ArticleCategory } from '../../../../components';

const ArticleDetails = () => {
  // Dummy article data
  const article = {
    id: 1,
    title: "Organic Fruits",
    date: "October 1, 2024",
    author_name: "Christian Doe",
    image: "/assets/images/home/biolife-banner__style-01.jpg",
    description: "This is a brief description of organic fruits.",
  };

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="bg-white">
      <div className="relative">
        <img src={bg} alt="Background" className="w-full h-60 object-cover" />
        <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
          {article.title}
        </h1>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <img src={article.image} alt={article.title} className="w-full h-64 object-cover rounded-lg" />
                <h2 className="text-2xl font-semibold mt-4">{article.title}</h2>
                <p className="text-gray-600">
                  <span className="mr-4">{article.date}</span>
                  <span>Posted By: {article.author_name || "Admin"}</span>
                </p>
              </div>

              <div className="mb-4 text-gray-700">{article.description}</div>

              <div className="flex justify-between items-center mt-4">
                <Articletags article={article} />
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <FaEye className="text-gray-500" />
                    <span className="ml-1 text-gray-500">630</span>
                  </div>
                  <div className="flex items-center">
                    <FaComment className="text-gray-500" />
                    <span className="ml-1 text-gray-500">26</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Share:</span>
                    <a href="#" className="text-blue-500 hover:text-blue-700"><FaTwitter /></a>
                    <a href="#" className="text-blue-500 hover:text-blue-700"><FaFacebook /></a>
                    <a href="#" className="text-blue-500 hover:text-blue-700"><FaPinterest /></a>
                    <a href="#" className="text-blue-500 hover:text-blue-700"><FaYoutube /></a>
                    <a href="#" className="text-blue-500 hover:text-blue-700"><FaInstagram /></a>
                  </div>
                </div>
              </div>

              <Comments articleId={article.id} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="font-semibold text-lg mb-4">Sidebar</div>

              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder="SEARCH..."
                    className="border border-gray-300 rounded-full py-2 pl-10 pr-4 w-full"
                  />
                  <button className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <FaSearch />
                  </button>
                </div>
              </div>

              <ArticleCategory article={article} />
              <RecentPost />
              <RecentComments />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
