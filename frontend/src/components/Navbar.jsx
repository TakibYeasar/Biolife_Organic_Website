import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes, FaEnvelope, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import organic4 from '/assets/images/organic-4.png';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../redux/features/auth/authApi';
import { toast } from 'react-toastify';
import LikedProducts from './Products/LikedProducts';
import Wishlists from './Products/Wishlists';

const Navbar = ({ user, isAuthenticated }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState({ heart: false, cart: false });
    const [theme, setTheme] = useState('light-theme');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleScroll = () => {
        setIsScrolled(window.scrollY >= 80);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark-theme' ? 'light-theme' : 'dark-theme'));
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const getDashboardPath = () => {
        if (user?.role === 'admin') return '/admin-dashboard';
        if (user?.role === 'customer') return '/customer-dashboard';
        if (user?.role === 'farmer') return '/farmer-dashboard';
        return '/sign-in';
    };

    const handleDashboardClick = () => {
        const path = getDashboardPath();
        navigate(path);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                throw new Error('No token found');
            }

            await dispatch(useLogoutMutation({ token })).unwrap();
            localStorage.clear();
            sessionStorage.clear();
            toast.success('Logged out successfully');
            navigate('/');
        } catch (error) {
            toast.error(`Logout failed: ${error.message || 'Please try again.'}`);
        }
    };

    return (
        <header
            className={`bg-primary ${isScrolled ? 'shadow-md' : ''} fixed top-0 left-0 w-full z-50 transition-shadow duration-300`}
        >
            {/* Top Bar */}
            <div className="bg-secondary py-2 text-sm">
                <div className="container mx-auto flex justify-between items-center text-white">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <FaEnvelope />
                            <span>Organic@company.com</span>
                        </div>
                        <span>Free Shipping for Orders over $99</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <select className="bg-transparent border border-white px-2 py-1 rounded text-white">
                            <option value="eur">€ EUR</option>
                            <option value="usd">$ USD</option>
                            <option value="gbp">£ GBP</option>
                            <option value="jpy">¥ JPY</option>
                        </select>
                        <select className="bg-transparent border border-white px-2 py-1 rounded text-white">
                            <option value="en">English</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="jp">Japanese</option>
                        </select>
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="bg-white text-primary px-4 py-1 rounded hover:bg-secondary hover:text-white transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <Link
                                    to="/sign-up"
                                    className="bg-white text-primary px-4 py-1 rounded hover:bg-secondary hover:text-white transition"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    to="/sign-in"
                                    className="bg-white text-primary px-4 py-1 rounded hover:bg-secondary hover:text-white transition"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="container mx-auto flex justify-between items-center py-4">
                {/* Logo */}
                <Link to="/">
                    <img src={organic4} alt="Organic Farm Logo" className="h-12" />
                </Link>

                {/* Desktop Links */}
                <nav className="hidden lg:flex gap-8 text-white">
                    {['Home', 'About', 'Products', 'Articles', 'Contact'].map((item) => (
                        <Link
                            to={`/${item.toLowerCase()}`}
                            key={item}
                            className="hover:text-secondary transition"
                        >
                            {item}
                        </Link>
                    ))}
                    {isAuthenticated && (
                        <button
                            onClick={handleDashboardClick}
                            className="hover:text-secondary transition"
                        >
                            Dashboard
                        </button>
                    )}
                </nav>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {user?.role === 'customer' && (
                        <div className="flex items-center gap-4">
                            <div
                                className="relative"
                                onMouseEnter={() => setIsHovered((prev) => ({ ...prev, heart: true }))}
                                onMouseLeave={() => setIsHovered((prev) => ({ ...prev, heart: false }))}
                            >
                                <button className="text-gray-600 hover:text-gray-900">
                                    <FaHeart className="text-white text-2xl" />
                                </button>
                                {isHovered.heart && <LikedProducts />}
                            </div>
                            <div
                                className="relative"
                                onMouseEnter={() => setIsHovered((prev) => ({ ...prev, cart: true }))}
                                onMouseLeave={() => setIsHovered((prev) => ({ ...prev, cart: false }))}
                            >
                                <button className="text-gray-600 hover:text-gray-900">
                                    <FaShoppingCart className="text-white text-2xl" />
                                </button>
                                {isHovered.cart && <Wishlists />}
                            </div>
                        </div>
                    )}
                    <button onClick={toggleTheme} className="text-white text-2xl">
                        {theme === 'dark-theme' ? <BsSun /> : <BsMoon />}
                    </button>
                    <button onClick={toggleMenu} className="text-white text-2xl lg:hidden">
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="bg-primary lg:hidden">
                    <ul className="flex flex-col items-center py-4 text-white">
                        {['Home', 'About', 'Products', 'Articles', 'Contact'].map((item) => (
                            <li key={item}>
                                <Link to={`/${item.toLowerCase()}`} onClick={toggleMenu}>
                                    {item}
                                </Link>
                            </li>
                        ))}
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <button
                                        onClick={() => {
                                            handleDashboardClick();
                                            toggleMenu();
                                        }}
                                    >
                                        Dashboard
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            toggleMenu();
                                        }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/sign-in" onClick={toggleMenu}>
                                        Sign In
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/sign-up" onClick={toggleMenu}>
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
