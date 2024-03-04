import React, { useEffect, useState } from 'react';
import "./Articleview.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaAngleRight, FaComment, FaEye, FaFacebook, FaFileImage, FaHeart, FaInstagram, FaPaperclip, FaPinterest, FaSearch, FaSmile, FaThumbsDown, FaThumbsUp, FaTwitter, FaYoutube } from "react-icons/fa";
import post_thumb from "../../../../../assets/images/blogpost/post_thumbnail.jpg";
import bg from "../../../../../assets/images/home/biolife-banner__style-01.jpg";
import author02 from "../../../../../assets/images/blogpost/author-02.png";
import author03 from "../../../../../assets/images/blogpost/author-03.png";
import post01 from "../../../../../assets/images/blogpost/post-wgt-01.jpg";
import post02 from "../../../../../assets/images/blogpost/post-wgt-02.jpg";
import post03 from "../../../../../assets/images/blogpost/post-wgt-03.jpg";
import author from "../../../../../assets/images/blogpost/author.png";
import author2 from "../../../../../assets/images/blogpost/author-02.png";
import viewer from "../../../../../assets/images/blogpost/viewer-avt.png";
import { useParams } from 'react-router-dom';
// import { domain } from "../../../../../env";
import axios from "axios";

const Articleview = () => {

  return (
    <div className="blogview-sec">
      <div className="breadcrumb">
        <img src={bg} alt="" className='img-fluid' />
        <h1 className='title'>Organic Fruits</h1>
      </div>
      <div className="container">
        <div className="row d-flex">


          {/* <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12">
                {article.map((item, i) => (
                  <div className="single-post-contain " key={i} item>
                    <div className="post-head">
                      <div className="thumbnail">
                        <figure><img src={item?.image} width="870" height="635" alt="" /></figure>
                      </div>
                      <h2 className="post-name">{item?.title}</h2>
                      <p className="post-archive"><b className="post-cat">{item?.category}</b><span className="post-date"> / {item?.date}</span><span className="author">Posted By: {item?.author}</span></p>
                    </div>

                    <div className="post-content">{item?.description}</div>

                    <div className="post-foot">

                      <div className="post-tags d-flex">
                        <span className="tag-title">Tags:</span>
                        <ul className="tags d-flex">
                          <li><a href="#" className="tag-link">{item?.tags}</a></li>
                        </ul>
                      </div>

                      <div className="auth-info d-flex">
                        <div className="auth">
                          <a href="#" className="avatar"><img src={author2} width={29} height={28} /><span>Christian Doe</span></a>
                          <span className="count-item viewer"><FaEye className="icon" aria-hidden="true" />630</span>
                          <span className="count-item commented"><FaComment className="icon" aria-hidden="true" />26</span>
                        </div>
                        <div className="socials-connection d-flex">
                          <span className="title">Share:</span>
                          <ul className="social-list d-flex">
                            <li><a href="#" className="socail-link"><FaTwitter aria-hidden="true" /></a></li>
                            <li><a href="#" className="socail-link"><FaFacebook aria-hidden="true" /></a></li>
                            <li><a href="#" className="socail-link"><FaPinterest aria-hidden="true" /></a></li>
                            <li><a href="#" className="socail-link"><FaYoutube aria-hidden="true" /></a></li>
                            <li><a href="#" className="socail-link"><FaInstagram aria-hidden="true" /></a></li>
                          </ul>
                        </div>
                      </div>

                    </div>

                    <div className="post-comments">
                      <h3 className="cmt-title">Comments<sup>(26)</sup></h3>

                      <div className="comment-form">
                        <form action="#" method="post" name="frm-post-comment">
                          <p className="form-row">
                            <textarea name="txt-comment" id="txt-comment-ath-3364" cols={30} rows={10} placeholder="Write your comment"></textarea>
                            <a href="#" className="current-author"><img src={viewer} width={41} height={41} alt="" /></a>
                          </p>
                          <p className="form-row last-btns">
                            <button type="submit" className="btn-style">post a comment</button>
                            <a href="#" className="btn btn-fn-1"><FaSmile aria-hidden="true" /></a>
                            <a href="#" className="btn btn-fn-1"><FaPaperclip aria-hidden="true" /></a>
                            <a href="#" className="btn btn-fn-1"><FaFileImage aria-hidden="true" /></a>
                          </p>
                        </form>
                      </div>

                      <div className="comment-list">

                        <ol className="post-comments lever-0">
                          <li className="comment-elem">
                            <div className="wrap-post-comment">

                              <div className="cmt-inner">
                                <div className="auth-info">
                                  <a href="#" className="author-contact"><img src={author02} alt="" width={29} height={28} />Christiano Bale</a>
                                  <span className="cmt-time">4 days ago</span>
                                </div>
                                <div className="cmt-content">
                                  <p>Nam sed eleifend dui, eu eleifend leo.Mauris ornare eros quis placerat mollis. Duis ornare euismod risus at dictum. Proin<br />
                                    at porttitor metus. Nunc luctus nisl suscipit, hendrerit ligula non.</p>
                                </div>
                                <div className="cmt-fooot">
                                  <a href="#" className="btn btn-response"><FaComment aria-hidden="true" />Comment</a>
                                  <a href="#" className="btn btn-like"><FaThumbsUp aria-hidden="true" />9</a>
                                  <a href="#" className="btn btn-dislike"><FaThumbsDown aria-hidden="true" />1</a>
                                </div>
                              </div>

                              <div className="comment-resposes">
                                <ol className="post-comments lever-1">
                                  <li className="comment-elem">
                                    <div className="wrap-post-comment">
                                      <div className="cmt-inner">
                                        <div className="auth-info">
                                          <a href="#" className="author-contact"><img src={author03} alt="" width="29" height="28" />Samuel Godi</a>
                                          <span className="cmt-time">4 days ago</span>
                                        </div>
                                        <div className="cmt-content">
                                          <p>Ut pellentesque gravida justo non rhoncus. Nunc ullamcorper tortor id aliquet luctus. Proin varius aliquam<br />
                                            consequat.Curabitur a commodo diam, vitae pellentesque urna.</p>
                                        </div>
                                        <div className="cmt-fooot">
                                          <a href="#" className="btn btn-response"><FaComment aria-hidden="true" />Comment</a>
                                          <a href="#" className="btn btn-like"><FaThumbsUp aria-hidden="true" />9</a>
                                          <a href="#" className="btn btn-dislike"><FaThumbsDown aria-hidden="true" />1</a>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ol>
                              </div>

                            </div>
                          </li>
                        </ol>

                        <div className="biolife-panigations-block">
                          <ul className="panigation-contain d-flex">
                            <li><span className="current-page">1</span></li>
                            <li><a href="#" className="link-page">2</a></li>
                            <li><a href="#" className="link-page">3</a></li>
                            <li><span className="sep">....</span></li>
                            <li><a href="#" className="link-page">20</a></li>
                            <li><a href="#" className="link-page next"><FaAngleRight aria-hidden="true" /></a></li>
                          </ul>
                        </div>
                      </div>

                    </div>
                  </div>

                ))}

              </div> */}


          <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
            <div className="blog-sidebar">

              <div className="sidebar-heading">
                <span className="main-title">Sidebar</span>
              </div>

              <div className="sidebar-contain">
                <div className="search-widget">
                  <div className="search-content">
                    <form action="#" name="frm-search" method="get" className="frm-search">
                      <input type="text" name="s" value="" placeholder="SEACH..." className="input-text" />
                      <button type="submit" name="ok"><FaSearch /></button>
                    </form>
                  </div>
                </div>

                <div className="category-widget">
                  <h4 className="main-title">Categories</h4>
                  {/* <div className="category-content">
                        {articlecata.map((item, i) => (
                          <ul className="cat-list" key={i} item>
                            <li className="cat-list-item"><a href="#" className="cat-link">{item?.title}</a></li>
                          </ul>
                          ))}
                      </div> */}
                </div>

                <div className="posts-widget">
                  <h4 className="main-title">Recent post</h4>
                  <div className="post-content">
                    <ul className="posts">

                      {/* {allarticle.map((item, i) => (
                            <li key={i} item>
                              <div className="post-item d-flex">
                                <div className="thumb">
                                  <a href="#"><img src={item?.image} alt="" /></a>
                                </div>
                                <div className="detail">
                                  <h4 className="post-name"><a href="#">{item?.title}</a></h4>
                                  <p className="post-archive">{item?.date}</p>
                                </div>
                              </div>
                            </li>
                          ))} */}

                    </ul>
                  </div>
                </div>

                <div className="comment-widget">
                  <h4 className="main-title">Recent Comments</h4>
                  <div className="comment-content">
                    <ul className="comment-list">
                      <li>
                        <p className="cmt-item"><a href="#" className="auth-name"><i className="biolife-icon icon-conversation"></i>Jessica Alba</a><a href="#" className="link-post">on Healthy Organics</a></p>
                      </li>
                      <li>
                        <p className="cmt-item"><a href="#" className="auth-name"><i className="biolife-icon icon-conversation"></i>Jessica Alba</a><a href="#" className="link-post">on Best Organics</a></p>
                      </li>
                      <li>
                        <p className="cmt-item"><a href="#" className="auth-name"><i className="biolife-icon icon-conversation"></i>Jessica Alba</a><a href="#" className="link-post">on Healthy Organics</a></p>
                      </li>
                      <li>
                        <p className="cmt-item"><a href="#" className="auth-name"><i className="biolife-icon icon-conversation"></i>Jessica Alba</a><a href="#" className="link-post">on Healthy Organics</a></p>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Articleview