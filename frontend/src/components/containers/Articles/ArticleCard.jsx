import React from "react";
import { FaComment, FaFacebook, FaHeart, FaInstagram, FaPinterest, FaShareAlt, FaTwitter, FaYoutube } from "react-icons/fa";
import author from "/assets/images/about-us/author-02.png";
import { Link, useNavigate } from "react-router-dom";

const ArticleCard = ({ item }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/articleview/${item.id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative">
        <a href={`/articleview/${item.id}`} className="block">
          <img src={item?.image} width={370} height={270} alt="" className="w-full h-64 object-cover" />
        </a>
        <div className="absolute top-4 left-4 bg-primary text-white rounded-full w-12 h-12 flex flex-col items-center justify-center">
          <span className="text-sm font-bold">{item?.date?.split("-")[2]}</span>
          <span className="text-sm font-bold">{item?.date?.split("-")[1]}</span>
        </div>
      </div>
      <div className="p-6 text-center">
        <h4 className="text-lg font-bold text-gray-900 mb-4">
          <Link to={`/articleview/${item.id}`}>{item?.title}</Link>
        </h4>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <a href="#" className="flex items-center space-x-2">
            <img src={author} width={28} height={28} alt="author" className="rounded-full" />
            <span className="font-bold text-gray-800">Admin</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-secondary">
            2 <FaHeart className="text-lg" />
          </a>
          <a href="#" className="flex items-center space-x-2 text-secondary">
            6 <FaComment className="text-lg" />
          </a>
          <div className="relative group">
            <FaShareAlt className="text-secondary text-lg cursor-pointer" />
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg py-2 px-4 mt-2">
              <ul className="flex space-x-4">
                <li><a href="#" className="text-blue-400"><FaTwitter /></a></li>
                <li><a href="#" className="text-blue-600"><FaFacebook /></a></li>
                <li><a href="#" className="text-red-600"><FaPinterest /></a></li>
                <li><a href="#" className="text-red-500"><FaYoutube /></a></li>
                <li><a href="#" className="text-pink-600"><FaInstagram /></a></li>
              </ul>
            </div>
          </div>
        </div>
        <button onClick={handleReadMore} className="btn btn-primary mt-4">
          Continue Reading
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
