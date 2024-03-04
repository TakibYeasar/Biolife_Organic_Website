import React from 'react';
import "./Productslist.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaAngleRight, FaHeart, FaRandom } from "react-icons/fa";
import bg from "../../../../../assets/images/home/biolife-banner__style-01.jpg";
import p1 from "../../../../../assets/images/products/p-01.jpg";
import p2 from "../../../../../assets/images/products/p-02.jpg";
import p3 from "../../../../../assets/images/products/p-03.jpg";
import p4 from "../../../../../assets/images/products/p-17.jpg";
import p5 from "../../../../../assets/images/products/p-05.jpg";

import p6 from "../../../../../assets/images/products/p-06.jpg";
import p7 from "../../../../../assets/images/products/p-07.jpg";
import p8 from "../../../../../assets/images/products/p-08.jpg";
import p9 from "../../../../../assets/images/products/p-09.jpg";
import p10 from "../../../../../assets/images/products/p-10.jpg";

import p11 from "../../../../../assets/images/products/p-11.jpg";
import p12 from "../../../../../assets/images/products/p-12.jpg";
import p13 from "../../../../../assets/images/products/p-13.jpg";
import p14 from "../../../../../assets/images/products/p-14.jpg";
import p15 from "../../../../../assets/images/products/p-15.jpg";
import { Singleprod } from "../../../components";

const prod_one = [
  {
    image: p1,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "Fresh Fruit",
    price: "450",
    old_price: "900",
  },
  {
    image: p2,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "Fresh Fruit",
    price: "450",
    old_price: "900",
  },
  {
    image: p3,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "Fresh Fruit",
    price: "450",
    old_price: "900",
  },
  {
    image: p4,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "Fresh Fruit",
    price: "450",
    old_price: "900",
  },
  {
    image: p5,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "Fresh Fruit",
    price: "450",
    old_price: "900",
  },
]

const prod_two = [
  {
    image: p11,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "Fresh Fruit",
    price: "450",
    old_price: "900",
  },
  {
    image: p12,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "Fresh Fruit",
    price: "450",
    old_price: "900",
  },
  {
    image: p13,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "Fresh Fruit",
    price: "450",
    old_price: "900",
  },
  {
    image: p14,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "Fresh Fruit",
    price: "450",
    old_price: "900",
  },
  {
    image: p15,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    category: "Fresh Fruit",
    price: "450",
    old_price: "900",
  },
]

const Productslist = () => {
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

              <div className="block-item recently-products-cat md-margin-bottom-39">
                <ul className="products-list biolife-carousel nav-center-02 nav-none-on-mobile"  >

                  {prod_one?.map((item, i) => (
                    <li key={i} item className="product-item col-lg-3 col-md-6 col-sm-12">
                      <Singleprod product={item?.product} />
                    </li>
                  ))}


                </ul>
              </div>

              <div className="product-category list-style">

                <div id="top-functions-area" className="top-functions-area" >
                  <div className="flt-item to-left group-on-mobile">
                    <span className="flt-title">Refine</span>
                    <a href="#" className="icon-for-mobile">
                      <span></span>
                      <span></span>
                      <span></span>
                    </a>
                    <div className="wrap-selectors">
                      <form action="#" name="frm-refine" method="get">
                        <span className="title-for-mobile">Refine Products By</span>
                        <div data-title="Price:" className="selector-item">
                          <select name="price" className="selector">
                            <option value="all">Price</option>
                            <option value="className-1st">Less than 5$</option>
                            <option value="className-2nd">$5-10$</option>
                            <option value="className-3rd">$10-20$</option>
                            <option value="className-4th">$20-45$</option>
                            <option value="className-5th">$45-100$</option>
                            <option value="className-6th">$100-150$</option>
                            <option value="className-7th">More than 150$</option>
                          </select>
                        </div>
                        <div data-title="Brand:" className="selector-item">
                          <select name="brad" className="selector">
                            <option value="all">Top brands</option>
                            <option value="br2">Brand first</option>
                            <option value="br3">Brand second</option>
                            <option value="br4">Brand third</option>
                            <option value="br5">Brand fourth</option>
                            <option value="br6">Brand fiveth</option>
                          </select>
                        </div>
                        <div data-title="Avalability:" className="selector-item">
                          <select name="ability" className="selector">
                            <option value="all">Availability</option>
                            <option value="vl2">Availability 1</option>
                            <option value="vl3">Availability 2</option>
                            <option value="vl4">Availability 3</option>
                            <option value="vl5">Availability 4</option>
                            <option value="vl6">Availability 5</option>
                          </select>
                        </div>
                        <p className="btn-for-mobile"><button type="submit" className="btn-submit">Go</button></p>
                      </form>
                    </div>
                  </div>
                  <div className="flt-item to-right">
                    <span className="flt-title">Sort</span>
                    <div className="wrap-selectors">
                      <div className="selector-item orderby-selector">
                        <select name="orderby" className="orderby" aria-label="Shop order">
                          <option value="menu_order" selected="selected">Default sorting</option>
                          <option value="popularity">popularity</option>
                          <option value="rating">average rating</option>
                          <option value="date">newness</option>
                          <option value="price">price: low to high</option>
                          <option value="price-desc">price: high to low</option>
                        </select>
                      </div>
                      <div className="selector-item viewmode-selector">
                        <a href="category-grid-left-sidebar.html" className="viewmode grid-mode"><i className="biolife-icon icon-grid"></i></a>
                        <a href="category-list-left-sidebar.html" className="viewmode detail-mode active"><i className="biolife-icon icon-list"></i></a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <ul className="products-list">

                    <li className="product-item col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="contain-product pr-detail-layout">
                        <div className="product-thumb">
                          <a href="#" className="link-to-product">
                            <img src={p11} alt="dd" width={270} height={270} className="product-thumnail" />
                          </a>
                        </div>
                        <div className="info">
                          <b className="categories">Fresh Fruit</b>
                          <h4 className="product-title"><a href="#" className="pr-name">Organic 10 Assorted Flavors Jelly Beans, 5.5 Oz</a></h4>
                          <p className="excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel maximus lacus. Duis ut mauris eget justo dictum tempus sed vel tellus.</p>
                          <div className="price">
                            <ins><span className="price-amount"><span className="currencySymbol">£</span>85.00</span></ins>
                            <del><span className="price-amount"><span className="currencySymbol">£</span>95.00</span></del>
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
              <div className="biolife-mobile-panels">
                <span className="biolife-current-panel-title">Sidebar</span>
                <a className="biolife-close-btn" href="#" data-object="open-mobile-filter">&times;</a>
              </div>
              <div className="sidebar-contain">
                <div className="widget biolife-filter">
                  <h4 className="wgt-title">Departements</h4>
                  <div className="wgt-content">
                    <ul className="cat-list">
                      <li className="cat-list-item"><a href="#" className="cat-link">Organic Food</a></li>
                      <li className="cat-list-item"><a href="#" className="cat-link">Fresh Fruit</a></li>
                      <li className="cat-list-item"><a href="#" className="cat-link">Dried Fruits</a></li>
                    </ul>
                  </div>
                </div>

                <div className="widget biolife-filter">
                  <h4 className="wgt-title">Shipping & Pickup</h4>
                  <div className="wgt-content">
                    <ul className="cat-list">
                      <li className="cat-list-item"><a href="#" className="cat-link">Show all</a></li>
                      <li className="cat-list-item"><a href="#" className="cat-link">2- Day shipping</a></li>
                      <li className="cat-list-item"><a href="#" className="cat-link">Shop to Home</a></li>
                      <li className="cat-list-item"><a href="#" className="cat-link">Free Pickup</a></li>
                    </ul>
                  </div>
                </div>

                <div className="widget price-filter biolife-filter">
                  <h4 className="wgt-title">Price</h4>
                  <div className="wgt-content">
                    <div className="frm-contain">
                      <form action="#" name="price-filter" id="price-filter" method="get">
                        <p className="f-item">
                          <label for="pr-from">$</label>
                          <input className="input-number" type="number" id="pr-from" value="" name="price-from" />
                        </p>
                        <p className="f-item">
                          <label for="pr-to">to $</label>
                          <input className="input-number" type="number" id="pr-to" value="" name="price-from" />
                        </p>
                        <p className="f-item"><button className="btn-submit" type="submit">go</button></p>
                      </form>
                    </div>
                    <ul className="check-list bold single">
                      <li className="check-list-item"><a href="#" className="check-link">$0 - $5</a></li>
                      <li className="check-list-item"><a href="#" className="check-link">$5 - $10</a></li>
                      <li className="check-list-item"><a href="#" className="check-link">$15 - $20</a></li>
                    </ul>
                  </div>
                </div>

                <div className="widget biolife-filter">
                  <h4 className="wgt-title">Brand</h4>
                  <div className="wgt-content">
                    <ul className="check-list multiple">
                      <li className="check-list-item"><a href="#" className="check-link">Great Value Organic</a></li>
                      <li className="check-list-item"><a href="#" className="check-link">Plum Organic</a></li>
                      <li className="check-list-item"><a href="#" className="check-link">Shop to Home</a></li>
                    </ul>
                  </div>
                </div>

                <div className="widget biolife-filter">
                  <h4 className="wgt-title">Color</h4>
                  <div className="wgt-content">
                    <ul className="color-list">
                      <li className="color-item"><a href="#" className="c-link"><span className="symbol img-color"></span>Multi</a></li>
                      <li className="color-item"><a href="#" className="c-link"><span className="symbol hex-code color-01"></span>Red</a></li>
                      <li className="color-item"><a href="#" className="c-link"><span className="symbol hex-code color-02"></span>Orrange</a></li>
                      <li className="color-item"><a href="#" className="c-link"><span className="symbol hex-code color-03"></span>Other</a></li>
                    </ul>
                  </div>
                </div>

                <div className="widget biolife-filter">
                  <h4 className="wgt-title">Popular Size</h4>
                  <div className="wgt-content">
                    <ul className="check-list bold multiple">
                      <li className="check-list-item"><a href="#" className="check-link">8oz</a></li>
                      <li className="check-list-item"><a href="#" className="check-link">15oz</a></li>
                      <li className="check-list-item"><a href="#" className="check-link">6oz</a></li>
                      <li className="check-list-item"><a href="#" className="check-link">30oz</a></li>
                    </ul>
                  </div>
                </div>

                <div className="widget biolife-filter">
                  <h4 className="wgt-title">Number of Pieces</h4>
                  <div className="wgt-content">
                    <ul className="check-list bold">
                      <li className="check-list-item"><a href="#" className="check-link">1 to 9</a></li>
                      <li className="check-list-item"><a href="#" className="check-link">10 to 15</a></li>
                    </ul>
                  </div>
                </div>

                <div className="widget biolife-filter">
                  <h4 className="wgt-title">Recently Viewed</h4>
                  <div className="wgt-content">
                    <ul className="products">

                      {prod_two?.map((item, i) => {
                        <li className="pr-item">
                          <div className="contain-product style-widget">
                            <div className="product-thumb">
                              <a href="#" className="link-to-product" tabindex="0">
                                <img src={item?.image} alt="dd" width={270} height={270} className="product-thumnail" />
                              </a>
                            </div>
                            <div className="info">
                              <b className="categories">{item?.category}</b>
                              <h4 className="product-title"><a href="#" className="pr-name" tabindex="0">{item?.title}</a></h4>
                              <div className="price">
                                <ins><span className="price-amount"><span className="currencySymbol">£</span>{item?.price}</span></ins>
                                <del><span className="price-amount"><span className="currencySymbol">£</span>{item?.old_price}</span></del>
                              </div>
                            </div>
                          </div>
                        </li>
                      })}


                    </ul>
                  </div>
                </div>

                <div className="widget biolife-filter">
                  <h4 className="wgt-title">Product Tags</h4>
                  <div className="wgt-content">
                    <ul className="tag-cloud">
                      <li className="tag-item"><a href="#" className="tag-link">Fresh Fruit</a></li>
                      <li className="tag-item"><a href="#" className="tag-link">Natural Food</a></li>
                      <li className="tag-item"><a href="#" className="tag-link">Hot</a></li>
                      <li className="tag-item"><a href="#" className="tag-link">Organics</a></li>
                      <li className="tag-item"><a href="#" className="tag-link">Dried Organic</a></li>
                    </ul>
                  </div>
                </div>
              </div>

            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Productslist