import React from "react";
import "./Singlearticle.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaComment, FaFacebook, FaHeart, FaInstagram, FaPinterest, FaShareAlt, FaTwitter, FaYoutube } from "react-icons/fa";
import author from "../../../../assets/images/about-us/author-02.png";
import { Link, useNavigate } from "react-router-dom";

const Singlearticle = ({ item }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/articleview/${item.id}`);
  };

  return (
    <div>
      <div className="article-thumb">
        <a href="#" className="link-to-post"><img src={item?.image} width={370} height={270} alt="" /></a>
        <div className="post-date">
          <span className="date">{item?.date?.split("-")[2]}</span>
          <span className="month">{item?.date?.split("-")[1]}</span>
        </div>
      </div>
      <div className="article-content text-center">
        <h4 className="post-name"><Link to={`/articleview/${item.id}`}>{item?.title}</Link></h4>
        {/* Use Link component for navigation within the app */}
        <div className="post-meta">
          <a href="#" className="post-meta__item author"><img src={author} width={28} height={28} alt="" /><span>Admin</span></a>
          <a href="#" className="post-meta__item btn liked-count">2 <FaHeart className="icon" /></a>
          <a href="#" className="post-meta__item btn comment-count">6 <FaComment className="icon" /></a>
          <div className="post-meta__item post-meta__item-social-box">
            <span className="tbn"><FaShareAlt aria-hidden="true" /></span>
            <div className="inner-content">
              <ul className="socials ">
                <li><a href="#" title="twitter" className="socail-btn"><FaTwitter aria-hidden="true" /></a></li>
                <li><a href="#" title="facebook" className="socail-btn"><FaFacebook aria-hidden="true" /></a></li>
                <li><a href="#" title="pinterest" className="socail-btn"><FaPinterest aria-hidden="true" /></a></li>
                <li><a href="#" title="youtube" className="socail-btn"><FaYoutube aria-hidden="true" /></a></li>
                <li><a href="#" title="instagram" className="socail-btn"><FaInstagram aria-hidden="true" /></a></li>
              </ul>
            </div>
          </div>
        </div>
        <button onClick={handleReadMore} className="btn readmore">continue reading</button>
      </div>
    </div>
  );
};

export default Singlearticle;
