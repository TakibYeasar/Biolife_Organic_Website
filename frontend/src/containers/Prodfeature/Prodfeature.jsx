import React from 'react';
import "./Prodfeature.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import p01 from "../../../../assets/images/products/p-01.jpg";
import p02 from "../../../../assets/images/products/p-02.jpg";
import p03 from "../../../../assets/images/products/p-03.jpg";
import p04 from "../../../../assets/images/products/p-09.jpg";
import p05 from "../../../../assets/images/products/p-05.jpg";
import p06 from "../../../../assets/images/products/p-06.jpg";
import p07 from "../../../../assets/images/products/p-07.jpg";
import p08 from "../../../../assets/images/products/p-08.jpg";
import p09 from "../../../../assets/images/products/p-09.jpg";

const topratedprod = [
    {
        photo_main: p01,
        category: "consectetur adipisicing",
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        price: "850",
        old_price: "950",
    },
    {
        photo_main: p02,
        category: "consectetur adipisicing",
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        price: "850",
        old_price: "950",
    },
    {
        photo_main: p03,
        category: "consectetur adipisicing",
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        price: "850",
        old_price: "950",
    },
]
const featuredprod = [
    {
        photo_main: p04,
        category: "consectetur adipisicing",
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        price: "850",
        old_price: "950",
    },
    {
        photo_main: p05,
        category: "consectetur adipisicing",
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        price: "850",
        old_price: "950",
    },
    {
        photo_main: p06,
        category: "consectetur adipisicing",
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        price: "850",
        old_price: "950",
    },
]
const bestsellingprod = [
    {
        photo_main: p07,
        category: "consectetur adipisicing",
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        price: "850",
        old_price: "950",
    },
    {
        photo_main: p08,
        category: "consectetur adipisicing",
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        price: "850",
        old_price: "950",
    },
    {
        photo_main: p09,
        category: "consectetur adipisicing",
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        price: "850",
        old_price: "950",
    },
]

const Prodfeature = () => {
    return (
        <div className="prodfeature_sec">
            <div className="container">
                <div className="row">

                    <div className="col-sm-6 col-md-4 col-xs-12">
                        <div className="advance-product-box">
                            <div className="biolife-title-box">
                                <h3 className="title">Top Rated Products</h3>
                            </div>
                            <ul className="products-list">
                                {topratedprod.map((item, i) => (
                                    <li className="product-item" key={i} item="true">
                                        <div className="contain-product d-flex">
                                            <div className="product-thumb">
                                                <a href="#" className="link-to-product">
                                                    <img src={item?.photo_main} alt="Vegetables" className="product-thumnail" />
                                                </a>
                                            </div>
                                            <div className="info">
                                                <h4 className="product-title"><a href="#" className="pr-name">{item?.title}</a></h4>
                                                <div className="price d-flex">
                                                    <ins><span className="price-amount"><span className="currencySymbol">£</span>{item?.price}</span></ins>
                                                    <del><span className="price-amount"><span className="currencySymbol">£</span>{item?.old_price}</span></del>
                                                </div>
                                                <div className="rating d-flex">
                                                    <p className="star-rating"><span className="width-80percent"></span></p>
                                                    <span className="review-count">(05 Reviews)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-4 col-xs-12">
                        <div className="advance-product-box">
                            <div className="biolife-title-box">
                                <h3 className="title">Featured Products</h3>
                            </div>
                            <ul className="products-list">
                                {featuredprod.map((item, i) => (
                                    <li className="product-item" key={i} item="true">
                                        <div className="contain-product d-flex">
                                            <div className="product-thumb">
                                                <a href="#" className="link-to-product">
                                                    <img src={item?.photo_main} alt="Vegetables" className="product-thumnail" />
                                                </a>
                                            </div>
                                            <div className="info">
                                                <h4 className="product-title"><a href="#" className="pr-name">{item?.title}</a></h4>
                                                <div className="price d-flex">
                                                    <ins><span className="price-amount"><span className="currencySymbol">£</span>{item?.price}</span></ins>
                                                    <del><span className="price-amount"><span className="currencySymbol">£</span>{item?.old_price}</span></del>
                                                </div>
                                                <div className="rating d-flex">
                                                    <p className="star-rating"><span className="width-80percent"></span></p>
                                                    <span className="review-count">(05 Reviews)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-4 col-xs-12 sm-margin-top-54px md-margin-top-0">
                        <div className="advance-product-box">
                            <div className="biolife-title-box">
                                <h3 className="title">Bestseller Products</h3>
                            </div>
                            <ul className="products-list">
                                {bestsellingprod.map((item, i) => (
                                    <li className="product-item" key={i} item="true">
                                        <div className="contain-product d-flex">
                                            <div className="product-thumb">
                                                <a href="#" className="link-to-product">
                                                    <img src={item?.photo_main} alt="Vegetables" className="product-thumnail" />
                                                </a>
                                            </div>
                                            <div className="info">
                                                <h4 className="product-title"><a href="#" className="pr-name">{item?.title}</a></h4>
                                                <div className="price d-flex">
                                                    <ins><span className="price-amount"><span className="currencySymbol">£</span>{item?.price}</span></ins>
                                                    <del><span className="price-amount"><span className="currencySymbol">£</span>{item?.old_price}</span></del>
                                                </div>
                                                <div className="rating d-flex">
                                                    <p className="star-rating"><span className="width-80percent"></span></p>
                                                    <span className="review-count">(05 Reviews)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Prodfeature