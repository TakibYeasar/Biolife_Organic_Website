import React, { useEffect, useState } from 'react';
import "./Shippingfaq.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaAngleRight, FaCaretDown, FaCaretRight, FaCaretUp, FaCartArrowDown, FaFacebook, FaFlag, FaHeart, FaInstagram, FaPinterest, FaPlus, FaRandom, FaShareAlt, FaStar, FaStarHalf, FaThumbsDown, FaThumbsUp, FaTwitter } from "react-icons/fa";

const Shippingfaq = () => {

    return (
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

    )
}


export default Shippingfaq