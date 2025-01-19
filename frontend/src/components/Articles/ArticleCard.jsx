import React, { useState, useEffect } from "react";
import {
  FaComment,
  FaHeart,
  FaTwitter,
  FaFacebook,
  FaPinterest,
  FaYoutube,
  FaInstagram,
  FaShareAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import author from "/assets/images/about-us/author-02.png";
import { useCurrentUserQuery } from "../../redux/features/auth/authApi";
import { useLikeArticleMutation, useUnlikeArticleMutation } from "../../redux/features/articles/articlesApi";

const ArticleCard = ({ item }) => {
  const navigate = useNavigate();

  // Fetch current user
  const { data: user, isLoading } = useCurrentUserQuery();
  const [isLiked, setIsLiked] = useState(false);

  // Redux hooks for liking and unliking an article
  const [likeArticle] = useLikeArticleMutation();
  const [unlikeArticle] = useUnlikeArticleMutation();

  // Determine if the article is liked by the user on component mount or item update
  useEffect(() => {
    if (user && item?.likes?.includes(user.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [user, item]);

  // Handle like/unlike functionality
  const handleLike = () => {
    if (isLiked) {
      unlikeArticle(item?.id);
    } else {
      likeArticle(item?.id);
    }
    setIsLiked(!isLiked);
  };

  // Navigate to article details page
  const handleReadMore = () => {
    navigate(`/article/${item.id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Article Image */}
      <div className="relative">
        <Link to={`/article/${item.id}`}>
          <img
            src={item?.image}
            alt={item?.title}
            className="w-full h-56 object-cover"
          />
        </Link>
        <div className="absolute top-4 left-4 bg-primary text-white rounded-lg px-3 py-1 text-sm font-semibold">
          {item?.date?.split("-")[2]} {item?.date?.split("-")[1]}
        </div>
      </div>

      {/* Article Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-primary">
          <Link to={`/article/${item.id}`}>{item?.title}</Link>
        </h3>

        <div className="flex items-center text-sm text-gray-600 space-x-4 mb-3">
          {/* Author Information */}
          <div className="flex items-center space-x-2">
            <img
              src={author}
              alt="author"
              className="w-6 h-6 rounded-full"
            />
            <span>Admin</span>
          </div>

          {/* Like Count */}
          <div className="flex items-center space-x-1">
            <button onClick={handleLike} aria-label="Like Article">
              <FaHeart className={`text-xl ${isLiked ? "text-red-500" : "text-gray-600"}`} />
            </button>
            <span>{item?.like_count}</span>
          </div>

          {/* Comment Count */}
          <div className="flex items-center space-x-1">
            <FaComment className="text-blue-500" />
            <span>6</span>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleReadMore}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-300"
          >
            Read More
          </button>
          <div className="relative group">
            <FaShareAlt className="text-gray-500 text-lg cursor-pointer hover:text-primary" />
            <div className="absolute hidden group-hover:flex bg-white shadow-md rounded-md p-2 space-x-2 mt-2">
              <a href="#" className="text-blue-500">
                <FaTwitter />
              </a>
              <a href="#" className="text-blue-700">
                <FaFacebook />
              </a>
              <a href="#" className="text-red-500">
                <FaPinterest />
              </a>
              <a href="#" className="text-red-600">
                <FaYoutube />
              </a>
              <a href="#" className="text-pink-500">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
