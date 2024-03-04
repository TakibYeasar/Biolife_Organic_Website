import React from 'react';
import "./Articleslist.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaAngleRight, FaComment, FaHeart } from "react-icons/fa";
import bg from "../../../../../assets/images/home/biolife-banner__style-01.jpg";
// import post1 from "../../../../assets/images/our-blog/post-thumb-01.jpg";
// import post2 from "../../../../assets/images/our-blog/post-thumb-02.jpg";
// import post3 from "../../../../assets/images/our-blog/post-thumb-03.jpg";

// const allarticles = [
//   {
//     image: post1,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, alias?",
//     category: "Lorem ipsum",
//     date: "07/05/2023",
//     author: "consectetur adipisicing",
//   },
//   {
//     image: post2,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, alias?",
//     category: "Lorem ipsum",
//     date: "07/05/2023",
//     author: "consectetur adipisicing",
//   },
//   {
//     image: post3,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, alias?",
//     category: "Lorem ipsum",
//     date: "07/05/2023",
//     author: "consectetur adipisicing",
//   },
//   {
//     image: post1,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, alias?",
//     category: "Lorem ipsum",
//     date: "07/05/2023",
//     author: "consectetur adipisicing",
//   },
//   {
//     image: post2,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, alias?",
//     category: "Lorem ipsum",
//     date: "07/05/2023",
//     author: "consectetur adipisicing",
//   },
//   {
//     image: post3,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, alias?",
//     category: "Lorem ipsum",
//     date: "07/05/2023",
//     author: "consectetur adipisicing",
//   },
//   {
//     image: post1,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, alias?",
//     category: "Lorem ipsum",
//     date: "07/05/2023",
//     author: "consectetur adipisicing",
//   },
//   {
//     image: post2,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, alias?",
//     category: "Lorem ipsum",
//     date: "07/05/2023",
//     author: "consectetur adipisicing",
//   },
//   {
//     image: post3,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, alias?",
//     category: "Lorem ipsum",
//     date: "07/05/2023",
//     author: "consectetur adipisicing",
//   },
//   {
//     image: post1,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, alias?",
//     category: "Lorem ipsum",
//     date: "07/05/2023",
//     author: "consectetur adipisicing",
//   },
//   {
//     image: post2,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, alias?",
//     category: "Lorem ipsum",
//     date: "07/05/2023",
//     author: "consectetur adipisicing",
//   },
//   {
//     image: post3,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, alias?",
//     category: "Lorem ipsum",
//     date: "07/05/2023",
//     author: "consectetur adipisicing",
//   },
// ]

const Articleslist = ({ showAllArticles }) => {


  return (
    <div className="allblog-sec">
      <div className="breadcrumb">
        <img src={bg} alt="" className='img-fluid' />
        <h1 className='title'>Organic Fruits</h1>
      </div>
      <div className="container">
        <div className="boillife-nav d-flex">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/Articleslist">Our Blog</a>
        </div>

        <div className="page-contain blog-page">
          <div className="posts-elem main-post-list d-flex flex-wrap">

            {showAllArticles?.map((item, i) => (
              <div className="post-elem col-lg-4 col-md-4 col-sm-6 col-xs-12" key={i} item>
                <div className="post-item effect-04 style-bottom-info">
                  <div className="thumbnail">
                    <a href="#" className="link-to-post"><img src={item?.image} width={370} height={270} alt="" /></a>
                  </div>
                  <div className="post-content text-center">
                    <h4 className="post-name"><a href="#" className="linktopost">{item?.title}</a></h4>
                    <p className="post-archive"><b className="post-cat">{item?.category}</b><span className="post-date"> / {item?.date}</span><span className="author">{item?.author}</span></p>
                    <p className="excerpt">{item?.description}</p>
                    <div className="group-buttons">
                      <a href="#" className="btn-outline-border">read more</a>
                      <a href="#" className="btn count-number liked"><FaHeart className="icon" /><span className="number">{item?.liked}</span></a>
                      <a href="#" className="btn count-number commented"><FaComment className="icon" /><span className="number">{item?.comment}</span></a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="biolife-panigations-block text-center">
            <div className="panigation-contain d-flex">
              <div><span className="current-page">1</span></div>
              <div><a href="#" className="link-page">2</a></div>
              <div><a href="#" className="link-page">3</a></div>
              <div><span className="sep">....</span></div>
              <div><a href="#" className="link-page">20</a></div>
              <div><a href="#" className="link-page next"><FaAngleRight aria-hidden="true" /></a></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Articleslist