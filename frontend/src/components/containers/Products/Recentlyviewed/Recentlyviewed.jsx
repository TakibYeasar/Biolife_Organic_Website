import React from 'react';
import "./Recentlyviewed.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import p11 from "../../../../../assets/images/products/p-11.jpg";
import p12 from "../../../../../assets/images/products/p-12.jpg";
import p13 from "../../../../../assets/images/products/p-13.jpg";
import p14 from "../../../../../assets/images/products/p-14.jpg";
import p15 from "../../../../../assets/images/products/p-15.jpg";


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

const Recentlyviewed = () => {
    return (

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
    )
}

export default Recentlyviewed