import React, { useEffect } from 'react';
import "./Productview.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaAngleRight, FaCaretDown, FaCaretRight, FaCaretUp, FaCartArrowDown, FaFacebook, FaFlag, FaHeart, FaInstagram, FaPinterest, FaPlus, FaRandom, FaShareAlt, FaStar, FaStarHalf, FaThumbsDown, FaThumbsUp, FaTwitter } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getSingleproductAsync, selectIsLoading, selectIsError, selectSingleproduct } from "../../../features/product/productSlice";
import { useParams } from 'react-router-dom';
import Proddescription from '../Proddescription/Proddescription';
import Additionalinfo from '../Additionalinfo/Additionalinfo';
import Shippingfaq from '../Shippingfaq/Shippingfaq';
import Customerreview from '../Customerreview/Customerreview';
import Relatedprod from '../Relatedprod/Relatedprod';

const Productview = () => {

  const { id } = useParams();
  const product = useSelector(selectSingleproduct);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(getSingleproductAsync(id));
  }, []);

  console.log("Product:", product);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching article details.</div>;
  }

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
                    <li><img src={product?.main_image?.image} alt="" width={500} height={500} /></li>
                    {product?.images?.map((item, i) => (
                      <li key={i} item="true"><img src={item?.image} alt="" width={500} height={500} /></li>
                    ))}
                  </ul>
                  {/* <ul className="slider-img d-flex" >
                    <li><img src={product?.main_image?.image} alt="" width={500} height={500} /></li>
                    {product?.images?.map((item, i) => (
                      <li key={i} item="true"><img src={item?.image} alt="" width={500} height={500} /></li>
                    ))}
                  </ul> */}
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

                <Proddescription product={product} />
                
                <Additionalinfo product={product} />

                <Shippingfaq />

                <Customerreview />
              </div>
            </div>

            {/* <Relatedprod /> */}

          </div>
        </div>
      </div>
    </section>
  )
}


export default Productview