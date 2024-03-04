import React, { useEffect, useState } from 'react';
import "./Productview.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaAngleRight, FaCaretDown, FaCaretRight, FaCaretUp, FaCartArrowDown, FaFacebook, FaFlag, FaHeart, FaInstagram, FaPinterest, FaPlus, FaRandom, FaShareAlt, FaStar, FaStarHalf, FaThumbsDown, FaThumbsUp, FaTwitter } from "react-icons/fa";
// import { addComment } from "../../actions/post";
// import { useDispatch } from "react-redux";
// import { toggleLike, deletePost } from "../../actions/post";

const Productview = () => {

  // const [formData, setFormData] = useState({ text: "" });
  // const auth = useSelector(state => state.auth);

  // const dispatch = useDispatch();
  return (
    <section>
      <div className="breadcrumb">
        <h1>Organic Fruits</h1>
      </div>
      <div className="prodview-sec">
        <div className="container">
          <div className="boillife-nav d-flex">
            <a href="/" className="home-page">Home</a>
            <span>/</span>
            <a href="/prodview" className="nav-item">Our products</a>
          </div>
        </div>

        <div className="page-contain single-product">
          <div className="container">

            <div className="sumary-product d-flex">
              <div className="row">
                <div className="media-content col-lg-4 col-md-6 col-12">
                  <ul className="slider-img d-flex" >
                    <li><img src={product?.photo_main} alt="" width={500} height={500} /></li>
                    <li><img src={product?.photo_2} alt="" width={500} height={500} /></li>
                    <li><img src={product?.photo_3} alt="" width={500} height={500} /></li>
                    <li><img src={product?.photo_4} alt="" width={500} height={500} /></li>
                    <li><img src={product?.photo_5} alt="" width={500} height={500} /></li>
                  </ul>
                  <ul className="slider-nav d-flex" >
                    <li><img src={product?.photo_main} alt="" width={88} height={88} /></li>
                    <li><img src={product?.photo_2} alt="" width={500} height={500} /></li>
                    <li><img src={product?.photo_3} alt="" width={500} height={500} /></li>
                    <li><img src={product?.photo_4} alt="" width={500} height={500} /></li>
                    <li><img src={product?.photo_5} alt="" width={500} height={500} /></li>
                  </ul>
                </div>
                <div className="product-attribute col-lg-4 col-md-6 col-sm-12">
                  <h3 className="title">{product?.title}</h3>
                  <div className="rating d-flex">
                    <div className="star-ratings d-flex">
                      <FaStar className="icon" />
                      <FaStar className="icon" />
                      <FaStar className="icon" />
                      <FaStar className="icon" />
                      <FaStarHalf className="icon" />
                    </div>
                    <span className="review-count">(04 Reviews)</span>
                  </div>
                  <p className="excerpt">{product?.description}</p>
                  <div className="price">
                    <ins><span className="price-amount"><span className="currencySymbol">£</span>{product?.price}</span></ins>
                    <del><span className="price-amount"><span className="currencySymbol">£</span>{product?.old_price}</span></del>
                  </div>
                  <div className="shipping-info">
                    <p className="shipping-day">3-Day Shipping</p>
                    <p className="for-today">Pree Pickup Today</p>
                  </div>
                </div>
                <div className="action-form col-lg-4 col-md-12 col-sm-12">
                  <div className="Cart-box">
                    <div className="quantity-box">
                      <span className="title">Quantity:</span>
                      <div className="qty-input">
                        <input type="text" name="qty12554" value="1" data-max_value="20" data-min_value="1" data-step="1" />
                        <div className="buttons">
                          <a href="#" className="qty-btn btn-up"><FaCaretUp aria-hidden="true" /></a>
                          <a href="#" className="qty-btn btn-down"><FaCaretDown aria-hidden="true" /></a>
                        </div>
                      </div>
                    </div>
                    <div className="buttons text-center">
                      <a href="#" className="btn-style">add to cart</a>
                      <p className="pull-row">
                        <a href="#" className="btn wishlist-btn"><FaPlus className="icon" /> wishlist</a>
                        <a href="#" className="btn compare-btn"><FaPlus className="icon" /> compare</a>
                      </p>
                    </div>
                    <div className="location d-grid">
                      <span className="title">Ship to:</span>
                      <select name="shipping_to" className="country">
                        <option value="-1">Select Country</option>
                        <option value="america">America</option>
                        <option value="france">France</option>
                        <option value="germany">Germany</option>
                        <option value="japan">Japan</option>
                      </select>
                    </div>
                    <div className="social-media">
                      <ul className="social-list d-flex">
                        <li><a href="#" className="social-link"><FaTwitter aria-hidden="true" /></a></li>
                        <li><a href="#" className="social-link"><FaFacebook aria-hidden="true" /></a></li>
                        <li><a href="#" className="social-link"><FaPinterest aria-hidden="true" /></a></li>
                        <li><a href="#" className="social-link"><FaShareAlt aria-hidden="true" /></a></li>
                        <li><a href="#" className="social-link"><FaInstagram aria-hidden="true" /></a></li>
                      </ul>
                    </div>
                    {/* <div className="acepted-payment-methods">
                      <ul className="payment-methods d-flex">
                        <li><img src={card1} alt="" width={51} height={36} /></li>
                        <li><img src={card2} alt="" width={51} height={36} /></li>
                        <li><img src={card3} alt="" width={51} height={36} /></li>
                        <li><img src={card4} alt="" width={51} height={36} /></li>
                      </ul>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="product-tabs single-layout biolife-tab-contain">
              <div className="tab-head">
                <ul className="tabs">
                  <li className="tab-element active"><a href="#tab_1st" className="tab-link">Products Descriptions</a></li>
                  <li className="tab-element" ><a href="#tab_2nd" className="tab-link">Addtional information</a></li>
                  <li className="tab-element" ><a href="#tab_3rd" className="tab-link">Shipping & Delivery</a></li>
                  <li className="tab-element" ><a href="#tab_4th" className="tab-link">Customer Reviews <sup>(3)</sup></a></li>
                </ul>
              </div>

              <div className="tab-content">
                <div id="tab_1st" className="tab-contain desc-tab active">
                  <p className="desc">{product?.description}</p>
                </div>
                <div id="tab_2nd" className="tab-contain addtional-info-tab">
                  <table className="tbl_attributes">
                    <tbody>
                      <tr>
                        <th>Color</th>
                        <td><p>{product?.color}</p></td>
                      </tr>
                      <tr>
                        <th>Size</th>
                        <td><p>{product?.size}</p></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id="tab_3rd" className="tab-contain shipping-delivery-tab">
                  <div className="accodition-tab biolife-accodition">
                    <ul className="tabs">

                      <li className="tab-item">
                        <span className="title btn-expand">How long will it take to receive my order?</span>
                        <div className="content">
                          <p>Orders placed before 3pm eastern time will normally be processed and shipped by the following business day. For orders received after 3pm, they will generally be processed and shipped on the second business day. For example if you place your order after 3pm on Monday the order will ship on Wednesday. Business days do not include Saturday and Sunday and all Holidays. Please allow additional processing time if you order is placed on a weekend or holiday. Once an order is processed, speed of delivery will be determined as follows based on the shipping mode selected:</p>
                          <div className="desc-expand">
                            <span className="title">Shipping mode</span>
                            <ul className="list">
                              <li>Standard (in transit 3-5 business days)</li>
                              <li>Priority (in transit 2-3 business days)</li>
                              <li>Express (in transit 1-2 business days)</li>
                              <li>Gift Card Orders are shipped via USPS First Class Mail. First Class mail will be delivered within 8 business days</li>
                            </ul>
                          </div>
                        </div>
                      </li>


                      
                    </ul>
                  </div>
                </div>
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
                              <input type="text" name="name" value="" placeholder="Your name" />
                            </p>
                            <p className="form-row wide-half">
                              <input type="email" name="email" value="" placeholder="Email address" />
                            </p>
                            <p className="form-row">
                              <textarea name="comment" id="txt-comment" cols="30" rows="10" placeholder="Write your review here..." onChange={e => setFormData({ text: e.target.value })}></textarea>
                            </p>
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
              </div>
            </div>

            <div className="product-related-box single-layout">
              <div className="biolife-title-box lg-margin-bottom-26px-im">
                <span className="biolife-icon icon-organic"></span>
                <span className="subtitle">All the best item for You</span>
                <h3 className="main-title">Related Products</h3>
              </div>
              <ul className="products-list biolife-carousel nav-center-02 nav-none-on-mobile" >

                {/* {data?.map((item, i) => (
                  <li key={i} item className="product-item col-lg-3 col-md-6 col-sm-12">
                    <Singleprod product={item?.product} />
                  </li>
                ))} */}


              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

// PostItem.defaultProps = {
//   showActions: true
// };


export default Productview