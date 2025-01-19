import React, { useState } from 'react';
import { FaComment, FaEye, FaFacebook, FaInstagram, FaPinterest, FaSearch, FaTwitter, FaYoutube } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import bg from "/assets/images/home/biolife-banner__style-01.jpg";
import { RecentComments, RecentPost, Articletags, Comments, ArticleCategory } from '../../../../components';
import { useFetchSingleArticleQuery } from "../../../../redux/features/articles/articlesApi";

const ArticleDetails = () => {
  const { id } = useParams();
  const { data: article, isLoading, isError, error } = useFetchSingleArticleQuery(id);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => setSearchValue(event.target.value);

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative">
        <img src={bg} alt="Background" className="w-full h-64 object-cover" />
        <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
          {article.title}
        </h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-500 mb-4">
                {article.date} | Posted By: {article.author_name || "Admin"}
              </p>
              <p className="text-gray-700 mb-4">{article.description}</p>

              <div className="flex justify-between items-center mb-4">
                <Articletags article={article} />
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-500">
                    <FaEye className="mr-1" />
                    <span>{article.views}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <FaComment className="mr-1" />
                    <span>{article.comments_count}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="font-semibold">Share:</span>
                <a href="#" className="text-blue-500 hover:text-blue-700"><FaTwitter /></a>
                <a href="#" className="text-blue-500 hover:text-blue-700"><FaFacebook /></a>
                <a href="#" className="text-red-500 hover:text-red-700"><FaPinterest /></a>
                <a href="#" className="text-red-600 hover:text-red-800"><FaYoutube /></a>
                <a href="#" className="text-pink-500 hover:text-pink-700"><FaInstagram /></a>
              </div>

              <Comments articleId={article.id} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-lg font-semibold mb-6">Search</div>
            <div className="relative mb-6">
              <input
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="bg-white w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <ArticleCategory article={article} />
            <RecentPost />
            <RecentComments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
