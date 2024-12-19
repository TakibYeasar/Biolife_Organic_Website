import React from 'react';
import { FaClock, FaFacebook, FaTwitter, FaInstagram, FaMailBulk, FaPhone, FaPinterest, FaSearchLocation, FaYoutube } from "react-icons/fa";
import card01 from "/assets/images/card1.jpg";
import card02 from "/assets/images/card2.jpg";
import card03 from "/assets/images/card3.jpg";
import card04 from "/assets/images/card4.jpg";
import card05 from "/assets/images/card5.jpg";

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Transport Offices Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Transport Offices</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <FaSearchLocation className="text-primary text-xl mr-3" />
                                <p className="text-gray-600">7563 St. Vicent Place, Glasgow, Greater Newyork NH7689, UK</p>
                            </li>
                            <li className="flex items-start">
                                <FaPhone className="text-primary text-xl mr-3" />
                                <p className="text-gray-600">Phone: (+067) 234 789, (+068) 222 888</p>
                            </li>
                            <li className="flex items-start">
                                <FaMailBulk className="text-primary text-xl mr-3" />
                                <p className="text-gray-600">Email: contact@company.com</p>
                            </li>
                            <li className="flex items-start">
                                <FaClock className="text-primary text-xl mr-3" />
                                <p className="text-gray-600">Hours: 7 Days a week from 10:00 am</p>
                            </li>
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-primary transition">Terms & Conditions</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary transition">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary transition">Project Protection</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary transition">Delivery Information</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary transition">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Product Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-primary transition">Pricing</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary transition">Features</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary transition">Customers</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary transition">One Click Apps</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary transition">Feedback</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Signup Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Newsletter Signup</h3>
                        <form className="flex items-center mb-6">
                            <input type="email" placeholder="Your email here..." className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary" />
                            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary-dark transition">Sign up</button>
                        </form>

                        <div className="flex space-x-4 mb-4">
                            <a href="#" className="text-gray-600 hover:text-primary transition"><FaTwitter className="text-2xl" /></a>
                            <a href="#" className="text-gray-600 hover:text-primary transition"><FaFacebook className="text-2xl" /></a>
                            <a href="#" className="text-gray-600 hover:text-primary transition"><FaPinterest className="text-2xl" /></a>
                            <a href="#" className="text-gray-600 hover:text-primary transition"><FaYoutube className="text-2xl" /></a>
                            <a href="#" className="text-gray-600 hover:text-primary transition"><FaInstagram className="text-2xl" /></a>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Payments System:</h4>
                            <div className="flex space-x-3">
                                <img src={card01} alt="Card 1" className="w-12 h-8 object-contain" />
                                <img src={card02} alt="Card 2" className="w-12 h-8 object-contain" />
                                <img src={card03} alt="Card 3" className="w-12 h-8 object-contain" />
                                <img src={card04} alt="Card 4" className="w-12 h-8 object-contain" />
                                <img src={card05} alt="Card 5" className="w-12 h-8 object-contain" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
