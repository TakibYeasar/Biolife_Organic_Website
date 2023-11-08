import React from 'react';
import "./Footer.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FaClock, FaFacebook, FaTwitter, FaInstagram, FaMailBulk, FaPhone, FaPinterest, FaSearchLocation, FaYoutube } from "react-icons/fa";
import card01 from "../../../../assets/images/card1.jpg";
import card02 from "../../../../assets/images/card2.jpg";
import card03 from "../../../../assets/images/card3.jpg";
import card04 from "../../../../assets/images/card4.jpg";
import card05 from "../../../../assets/images/card5.jpg";

const Footer = () => {
    return (
        <div className="footer-sec">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <section className="footer-item">
                            <h3 className="section-title">Transport Offices</h3>
                            <div className="contact-info">
                                <ul className="contact-lines">
                                    <li>
                                        <p className="info-item">
                                            <FaSearchLocation className="icon" />
                                            <b className="desc">7563 St. Vicent Place, Glasgow, Greater Newyork NH7689, UK </b>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="info-item">
                                            <FaPhone className="icon" />
                                            <b className="desc">Phone: (+067) 234 789  (+068) 222 888</b>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="info-item">
                                            <FaMailBulk className="icon" />
                                            <b className="desc">Email:  contact@company.com</b>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="info-item">
                                            <FaClock className="icon" />
                                            <b className="desc">Hours: 7 Days a week from 10:00 am</b>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    <div className="col-lg-2 col-md-2 col-sm-6">
                        <section className="footer-item">
                            <h3 className="section-title">Company</h3>
                            <ul>
                                <li><a href="#">Terms & Conditions</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Project Protection</a></li>
                                <li><a href="#">Delivery infomation</a></li>
                                <li><a href="#">FAQs</a></li>
                            </ul>
                        </section>
                    </div>

                    <div className="col-lg-2 col-md-2 col-sm-6">
                        <section className="footer-item">
                            <h3 className="section-title">Product</h3>
                            <ul>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">Features</a></li>
                                <li><a href="#">Customers</a></li>
                                <li><a href="#">One Click Apps</a></li>
                                <li><a href="#">Feed Back</a></li>
                            </ul>
                        </section>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <section className="footer-item">
                            <h3 className="section-title">Newsletter Signup</h3>
                            <div className="newsletter-block layout-02">
                                <div className="form-content">
                                    <form action="#" name="new-letter-foter">
                                        <input type="email" className="input-text email" placeholder="Your email here..." />
                                        <button type="submit" className="btn-submit" name="ok">Sign up</button>
                                    </form>
                                </div>
                            </div>
                            <div className="biolife-social inline bigger-on-mobile sm-margin-top-25px xs-margin-top-45px">
                                <ul className="socials d-flex">
                                    <li><a href="#" title="twitter" className="socail-btn"><FaTwitter className="icon" aria-hidden="true" /></a></li>
                                    <li><a href="#" title="facebook" className="socail-btn"><FaFacebook className="icon" aria-hidden="true" /></a></li>
                                    <li><a href="#" title="pinterest" className="socail-btn"><FaPinterest className="icon" aria-hidden="true" /></a></li>
                                    <li><a href="#" title="youtube" className="socail-btn"><FaYoutube className="icon" aria-hidden="true" /></a></li>
                                    <li><a href="#" title="instagram" className="socail-btn"><FaInstagram className="icon" aria-hidden="true" /></a></li>
                                </ul>
                            </div>
                            <div className="payment-methods">
                                <h4 className="title">Payments System:</h4>
                                <ul className="payments d-flex">
                                    <li><a href="#" className="payment-link"><img src={card01} width={51} height={36} alt="" /></a></li>
                                    <li><a href="#" className="payment-link"><img src={card02} width={51} height={36} alt="" /></a></li>
                                    <li><a href="#" className="payment-link"><img src={card03} width={51} height={36} alt="" /></a></li>
                                    <li><a href="#" className="payment-link"><img src={card04} width={51} height={36} alt="" /></a></li>
                                    <li><a href="#" className="payment-link"><img src={card05} width={51} height={36} alt="" /></a></li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer