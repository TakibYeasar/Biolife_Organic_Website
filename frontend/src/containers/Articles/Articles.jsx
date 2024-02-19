import React from 'react';
import "./Articles.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaComment, FaFacebook, FaHeart, FaInstagram, FaPinterest, FaShareAlt, FaTwitter, FaYoutube } from "react-icons/fa";
import author from "../../../../assets/images/about-us/author-02.png";
import { Link, useNavigate } from "react-router-dom";
import post1 from "../../../../assets/images/our-blog/post-thumb-01.jpg";
import post2 from "../../../../assets/images/our-blog/post-thumb-02.jpg";
import post3 from "../../../../assets/images/our-blog/post-thumb-03.jpg";

const articles = [
  {
    image: post1,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, alias?",
  },
  {
    image: post2,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, alias?",
  },
  {
    image: post3,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, alias?",
  },
]

const Articles = () => {
  return (
    <div className="article-sec">
      <div className="container">
        <div className="section-heading d-flex">
          <h3 className="main-title">Our Latest Articles</h3>
          <a href="#" className="blog-link">View All Articles</a>
        </div>

        <ul className="articles-container d-flex">
          
          {articles.map((item, i) => (
            <li key={i} item="true" className="articles-item">
              <div className="article-thumb">
                <a href="#" className="link-to-post"><img src={item?.image} width={370} height={270} alt="" /></a>
                <div className="post-date">
                  <span className="date">26</span>
                  <span className="month">dec</span>
                </div>
              </div>
              <div className="article-content text-center">
                <h4 className="post-name"><a href="#" className="linktopost">{item?.title}</a></h4>
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
                <Link className="group-buttons" to={`/blogview-${item?.title}-${item?.id}`}>
                  <a href="#" className="btn readmore">continue reading</a>
                </Link>
              </div>
            </li>
          ))}

        </ul>
      </div>
    </div>
  )
}

export default Articles