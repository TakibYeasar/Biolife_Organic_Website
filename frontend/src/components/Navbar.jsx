import React from 'react';
import organic4 from '/assets/images/organic-4.png';
import { FaCartPlus, FaEnvelope, FaHeart } from 'react-icons/fa';

const Navbar = () => {
    // Dummy data for user
    const user = null; // Change to an object like { name: "John" } to simulate a logged-in user

    return (
        <div className="bg-primary p-4">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    {/* Top Header */}
                    <div className="flex space-x-6 items-center">
                        <div className="flex items-center">
                            <FaEnvelope className="text-white" />
                            <span className="ml-2 text-white">Organic@company.com</span>
                        </div>
                        <span className="text-white">Free Shipping for all Order of $99</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <select className="select select-bordered select-sm">
                            <option value="eur">€ EUR (Euro)</option>
                            <option value="usd">$ USD (Dollar)</option>
                            <option value="gbp">£ GBP (Pound)</option>
                            <option value="jpy">¥ JPY (Yen)</option>
                        </select>
                        <select className="select select-bordered select-sm">
                            <option value="fr">French (EUR)</option>
                            <option value="en">English (USD)</option>
                            <option value="ger">Germany (GBP)</option>
                            <option value="jp">Japan (JPY)</option>
                        </select>
                        {user ? (
                            <button className="btn btn-outline" onClick={() => alert('Logged out!')}>
                                Logout
                            </button>
                        ) : (
                            <>
                                <a href="/register" className="btn btn-outline">
                                    Registration
                                </a>
                                <a href="/signin" className="btn btn-outline">
                                    SignIn
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/* Main Header */}
            <div className="container mx-auto my-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <a href="/" className="flex items-center">
                            <img src={organic4} alt="Logo" className="h-12" />
                        </a>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        <a href="/" className="text-lg font-medium hover:text-primary">Home</a>
                        <a href="/about" className="text-lg font-medium hover:text-primary">About</a>
                        <a href="/productslist" className="text-lg font-medium hover:text-primary">Product</a>
                        <a href="/articleslist" className="text-lg font-medium hover:text-primary">Articles</a>
                        <a href="/contact" className="text-lg font-medium hover:text-primary">Contact</a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <a href="#" className="text-2xl text-white">
                            <FaHeart />
                        </a>
                        <div className="relative">
                            <a href="/cart" className="text-2xl text-white">
                                <FaCartPlus />
                            </a>
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                0
                            </span>
                            <span className="ml-2 text-white">My Cart - $0.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
