import React, { useEffect, useState } from 'react';
import "./Customerreview.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaAngleRight, FaCaretDown, FaCaretRight, FaCaretUp, FaCartArrowDown, FaFacebook, FaFlag, FaHeart, FaInstagram, FaPinterest, FaPlus, FaRandom, FaShareAlt, FaStar, FaStarHalf, FaThumbsDown, FaThumbsUp, FaTwitter } from "react-icons/fa";

const Customerreview = () => {

    return (
        <div id="tab_4th" className="tab-contain review-tab">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                        <div className="rating-info">
                            <p className="index"><strong className="rating">4.4</strong>out of 5</p>
                            <div className="rating"><p className="star-rating"><span className="width-80percent"></span></p></div>
                            <p className="see-all">See all 68 reviews</p>
                            <ul className="options">
                                <li>
                                    <div className="detail-for">
                                        <span className="option-name">5stars</span>
                                        <span className="progres">
                                            <span className="line-100percent"><span className="percent width-90percent"></span></span>
                                        </span>
                                        <span className="number">90</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="detail-for">
                                        <span className="option-name">4stars</span>
                                        <span className="progres">
                                            <span className="line-100percent"><span className="percent width-30percent"></span></span>
                                        </span>
                                        <span className="number">30</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="detail-for">
                                        <span className="option-name">3stars</span>
                                        <span className="progres">
                                            <span className="line-100percent"><span className="percent width-40percent"></span></span>
                                        </span>
                                        <span className="number">40</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="detail-for">
                                        <span className="option-name">2stars</span>
                                        <span className="progres">
                                            <span className="line-100percent"><span className="percent width-20percent"></span></span>
                                        </span>
                                        <span className="number">20</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="detail-for">
                                        <span className="option-name">1star</span>
                                        <span className="progres">
                                            <span className="line-100percent"><span className="percent width-10percent"></span></span>
                                        </span>
                                        <span className="number">10</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-6 col-xs-12">
                        <div className="review-form-wrapper">
                            <span className="title">Submit your review</span>
                            <form action="#" name="frm-review" method="post">
                                {/* <form action="#" name="frm-review" method="post" onSubmit={e => {
                            e.preventDefault();
                            dispatch(addComment(postId, formData));
                            setFormData({ text: "" });
                          }}> */}
                                <div className="comment-form-rating">
                                    <label>1. Your rating of this products:</label>
                                    <p className="stars">
                                        <span>
                                            <a className="btn-rating" data-value="star-1" href="#"><FaStar /></a>
                                            <a className="btn-rating" data-value="star-2" href="#"><FaStar /></a>
                                            <a className="btn-rating" data-value="star-3" href="#"><FaStar /></a>
                                            <a className="btn-rating" data-value="star-4" href="#"><FaStar /></a>
                                            <a className="btn-rating" data-value="star-5" href="#"><FaStar /></a>
                                        </span>
                                    </p>
                                </div>
                                <p className="form-row wide-half">
                                    <input type="text" name="name" placeholder="Your name" />
                                </p>
                                <p className="form-row wide-half">
                                    <input type="email" name="email" placeholder="Email address" />
                                </p>
                                {/* <p className="form-row">
                                    <textarea name="comment" id="txt-comment" cols="30" rows="10" placeholder="Write your review here..." onChange={e => setFormData({ text: e.target.value })}></textarea>
                                </p> */}
                                <p className="form-row">
                                    <button type="submit" name="submit">submit review</button>
                                </p>

                                {/* {!auth.loading && comment.user === auth.user.id && (
                                    <button
                                        onClick={e => dispatch(deleteComment(postId, comment.id))}
                                        className="btn btn-danger"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                )} */}
                            </form>
                        </div>
                    </div>
                </div>
                <div id="comments">
                    <ol className="commentlist">

                        <li className="review">
                            <div className="comment-container">
                                <div className="row">
                                    <div className="comment-content col-lg-8 col-md-9 col-sm-8 col-xs-12">
                                        <p className="comment-in"><span className="post-name">Quality is our way of life</span><span className="post-date">01/04/2018</span></p>
                                        <div className="rating"><p className="star-rating"><span className="width-80percent"></span></p></div>
                                        <p className="author">by: <b>Shop organic</b></p>
                                        <p className="comment-text">There are few things in life that please people more than the succulence of quality fresh fruit and vegetables.  At Fresh Fruits we work to deliver the world’s freshest, choicest, and juiciest produce to discerning customers across the UAE and GCC.</p>
                                    </div>
                                    <div className="comment-review-form col-lg-3 col-lg-offset-1 col-md-3 col-sm-4 col-xs-12">
                                        <span className="title">Was this review helpful?</span>
                                        <ul className="actions">
                                            <li><a href="#" className="btn-act like" data-type="like"><FaThumbsUp />Yes (100)</a></li>
                                            <li><a href="#" className="btn-act hate" data-type="dislike"><FaThumbsDown />No (20)</a></li>
                                            <li><a href="#" className="btn-act report" data-type="dislike"><FaFlag />Report</a></li>
                                        </ul>
                                        {/* <Fragment>
                                            <button
                                                type="button"
                                                className="btn btn-light"
                                                onClick={e => {
                                                    dispatch(toggleLike(post.id));
                                                }}
                                            >
                                                <i className="fas fa-thumbs-up"></i>
                                                {post.likes.length > 0 && <span> {post.likes.length}</span>}
                                            </button>

                                            <Link to={`/posts/${post.id}`} className="btn btn-primary">
                                                Discussion{" "}
                                                {post.post_comments.length > 0 && (
                                                    <span className="comment-count">
                                                        {post.post_comments.length}
                                                    </span>
                                                )}
                                            </Link>
                                            {!auth.loading && auth.user.id === post.user && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => dispatch(deletePost(post.id))}
                                                >
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            )}
                                        </Fragment> */}
                                    </div>
                                </div>
                            </div>
                        </li>


                    </ol>
                    <div className="biolife-panigations-block version-2">
                        <ul className="panigation-contain">
                            <li><span className="current-page">1</span></li>
                            <li><a href="#" className="link-page">2</a></li>
                            <li><a href="#" className="link-page">3</a></li>
                            <li><span className="sep">....</span></li>
                            <li><a href="#" className="link-page">20</a></li>
                            <li><a href="#" className="link-page next"><FaAngleRight aria-hidden="true" /></a></li>
                        </ul>
                        <div className="result-count">
                            <p className="txt-count"><b>1-5</b> of <b>126</b> reviews</p>
                            <a href="#" className="link-to">See all<FaCaretRight aria-hidden="true" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Customerreview