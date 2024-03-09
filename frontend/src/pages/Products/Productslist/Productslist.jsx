import React, { useEffect } from 'react';
import "./Productslist.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaAngleRight, FaHeart, FaRandom } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoading, selectIsError, selectAllproducts, getAllproductsAsync } from '../../../features/product/productSlice';
import { useNavigate } from "react-router-dom";
import bg from "../../../../../assets/images/home/biolife-banner__style-01.jpg";
import p11 from "../../../../../assets/images/products/p-11.jpg";
import Sortproduct from '../Sortproduct/Sortproduct';
import Sidebar from '../Sidebar/Sidebar';
import Recentlyviewed from '../Recentlyviewed/Recentlyviewed';
import Producttags from '../Producttags/Producttags';

const Productslist = () => {

  const dispatch = useDispatch();
  const allproducts = useSelector(selectAllproducts);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(getAllproductsAsync());
  }, []);

  // console.log("Products:", allproducts);

  const navigate = useNavigate();
  const proddetails = (id) => {
    navigate(`/productview/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching article details.</div>;
  }

  return (
    <div className="allprod-sec">
      <div className="breadcrumb">
        <img src={bg} alt="" className='img-fluid' />
        <h1 className='title'>Organic Fruits</h1>
      </div>
      <div className="container">
        <div className="boillife-nav d-flex">
          <a href="/" className="home-page">Home</a>
          <span>/</span>
          <a href="/allprods" className="nav-item">Our Products</a>
        </div>
      </div>

      <div className="page-contain category-page left-sidebar">
        <div className="container">
          <div className="row">
            <div id="main-content" className="main-content col-lg-9 col-md-8 col-sm-12 col-xs-12">
              <div className="product-category list-style">

                <Sortproduct />

                <div className="row">
                  <ul className="products-list">

                    {allproducts?.map((item, i) => (
                      <li key={i} item="true" className="product-item col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="contain-product pr-detail-layout d-flex">
                          <div className="product-thumb">
                            <a href="#" className="link-to-product" onClick={() => proddetails(item.id)}>
                              <img src={item?.main_image?.image} alt="dd" width={270} height={270} className="product-thumnail" />
                            </a>
                          </div>
                          <div className="info">
                            <b className="categories">Fresh Fruit</b>
                            <h4 className="product-title"><a href="#" className="pr-name" onClick={() => proddetails(item.id)}>{item?.title}</a></h4>
                            {/* <p className="excerpt">{item?.description}</p> */}
                            <div className="price">
                              <ins><span className="price-amount"><span className="currencySymbol">£</span>{item?.price}</span></ins>
                              <del><span className="price-amount"><span className="currencySymbol">£</span>{item?.old_price}</span></del>
                            </div>
                            <div className="buttons">
                              <a href="#" className="btn wishlist-btn"><FaHeart aria-hidden="true" /></a>
                              <a href="#" className="btn add-to-cart-btn">add to cart</a>
                              <a href="#" className="btn compare-btn"><FaRandom aria-hidden="true" /></a>
                            </div>
                          </div>

                          <div className="advance-info">
                            <ul className="list">
                              <li>100% real fruit ingredients</li>
                              <li>All Sugar comes naturally</li>
                              <li>Non-GMO Project Verified</li>
                            </ul>
                            <div className="shipping-info">
                              <p className="shipping-day">3-Day Shipping</p>
                              <p className="for-today">Pree Pickup Today</p>
                            </div>
                          </div>

                        </div>
                      </li>
                    ))}


                  </ul>
                </div>

                <div className="biolife-panigations-block">
                  <ul className="panigation-contain">
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
            <aside id="sidebar" className="sidebar col-lg-3 col-md-4 col-sm-12 col-xs-12">
              <Sidebar />

              <Recentlyviewed />

              <Producttags />

            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Productslist