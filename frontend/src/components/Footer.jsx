import React from 'react';
import { FaClock, FaFacebook, FaTwitter, FaInstagram, FaMailBulk, FaPhone, FaPinterest, FaSearchLocation, FaYoutube } from "react-icons/fa";
import card01 from "/assets/images/card1.jpg";
import card02 from "/assets/images/card2.jpg";
import card03 from "/assets/images/card3.jpg";
import card04 from "/assets/images/card4.jpg";
import card05 from "/assets/images/card5.jpg";

const Footer = () => {
    return (
        <div className="bg-gray-200 py-12">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Transport Offices Section */}
                    <section className="footer-item">
                        <h3 className="text-xl font-semibold mb-4">Transport Offices</h3>
                        <div className="contact-info">
                            <ul className="list-none p-0">
                                <li className="flex items-center mb-2">
                                    <FaSearchLocation className="text-2xl text-secondary mr-2" />
                                    <p className="text-gray-700">
                                        <b>7563 St. Vicent Place, Glasgow, Greater Newyork NH7689, UK</b>
                                    </p>
                                </li>
                                <li className="flex items-center mb-2">
                                    <FaPhone className="text-2xl text-secondary mr-2" />
                                    <p className="text-gray-700">
                                        <b>Phone: (+067) 234 789  (+068) 222 888</b>
                                    </p>
                                </li>
                                <li className="flex items-center mb-2">
                                    <FaMailBulk className="text-2xl text-secondary mr-2" />
                                    <p className="text-gray-700">
                                        <b>Email: contact@company.com</b>
                                    </p>
                                </li>
                                <li className="flex items-center mb-2">
                                    <FaClock className="text-2xl text-secondary mr-2" />
                                    <p className="text-gray-700">
                                        <b>Hours: 7 Days a week from 10:00 am</b>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Company Section */}
                    <section className="footer-item">
                        <h3 className="text-xl font-semibold mb-4">Company</h3>
                        <ul className="list-none p-0">
                            <li><a href="#" className="text-secondary hover:underline">Terms & Conditions</a></li>
                            <li><a href="#" className="text-secondary hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="text-secondary hover:underline">Project Protection</a></li>
                            <li><a href="#" className="text-secondary hover:underline">Delivery Information</a></li>
                            <li><a href="#" className="text-secondary hover:underline">FAQs</a></li>
                        </ul>
                    </section>

                    {/* Product Section */}
                    <section className="footer-item">
                        <h3 className="text-xl font-semibold mb-4">Product</h3>
                        <ul className="list-none p-0">
                            <li><a href="#" className="text-secondary hover:underline">Pricing</a></li>
                            <li><a href="#" className="text-secondary hover:underline">Features</a></li>
                            <li><a href="#" className="text-secondary hover:underline">Customers</a></li>
                            <li><a href="#" className="text-secondary hover:underline">One Click Apps</a></li>
                            <li><a href="#" className="text-secondary hover:underline">Feedback</a></li>
                        </ul>
                    </section>

                    {/* Newsletter Signup Section */}
                    <section className="footer-item">
                        <h3 className="text-xl font-semibold mb-4">Newsletter Signup</h3>
                        <div className="newsletter-block mb-4">
                            <form action="#" className="flex">
                                <input type="email" className="input-text email border border-gray-300 rounded-l-full p-2 flex-1" placeholder="Your email here..." />
                                <button type="submit" className="btn-submit bg-primary text-white rounded-r-full p-2">Sign up</button>
                            </form>
                        </div>
                        <div className="biolife-social inline-block">
                            <ul className="flex space-x-4 mb-4">
                                <li><a href="#" title="twitter" className="text-secondary hover:text-primary"><FaTwitter className="text-2xl" /></a></li>
                                <li><a href="#" title="facebook" className="text-secondary hover:text-primary"><FaFacebook className="text-2xl" /></a></li>
                                <li><a href="#" title="pinterest" className="text-secondary hover:text-primary"><FaPinterest className="text-2xl" /></a></li>
                                <li><a href="#" title="youtube" className="text-secondary hover:text-primary"><FaYoutube className="text-2xl" /></a></li>
                                <li><a href="#" title="instagram" className="text-secondary hover:text-primary"><FaInstagram className="text-2xl" /></a></li>
                            </ul>
                        </div>
                        <div className="payment-methods">
                            <h4 className="text-lg font-semibold">Payments System:</h4>
                            <ul className="flex space-x-2 mt-2">
                                <li><a href="#" className="payment-link"><img src={card01} width={51} height={36} alt="Card 1" /></a></li>
                                <li><a href="#" className="payment-link"><img src={card02} width={51} height={36} alt="Card 2" /></a></li>
                                <li><a href="#" className="payment-link"><img src={card03} width={51} height={36} alt="Card 3" /></a></li>
                                <li><a href="#" className="payment-link"><img src={card04} width={51} height={36} alt="Card 4" /></a></li>
                                <li><a href="#" className="payment-link"><img src={card05} width={51} height={36} alt="Card 5" /></a></li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Footer;
