import React, { useEffect, useState } from 'react';
import "./Relatedprod.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";

const Relatedprod = () => {

    return (

        <div className="product-related-box single-layout">
            <div className="biolife-title-box lg-margin-bottom-26px-im">
                <span className="biolife-icon icon-organic"></span>
                <span className="subtitle">All the best item for You</span>
                <h3 className="main-title">Related Products</h3>
            </div>
            <ul className="products-list biolife-carousel nav-center-02 nav-none-on-mobile" >

                {data?.map((item, i) => (
                    <li key={i} item className="product-item col-lg-3 col-md-6 col-sm-12">
                        <Singleprod product={item?.product} />
                    </li>
                ))}


            </ul>
        </div>
    )
}


export default Relatedprod