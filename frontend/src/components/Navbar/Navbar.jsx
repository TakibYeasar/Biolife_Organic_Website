import React, { useEffect } from 'react';
import "./Navbar.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import organic4 from "../../../../assets/images/organic-4.png";
import { FaCartPlus, FaEnvelope, FaFacebook, FaHeart, FaPinterest, FaShoppingCart, FaTwitter, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { logOutUserAsync} from "../../features/auth/authService";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { user } = useSelector(selectCurrentUser);

    const onLogout = () => {
        dispatch(logOutUserAsync());
        // dispatch(reset()); // Potentially reset user data in the store
        navigate("/");
    };



    return (
        <div className="navbar-sec">
            <div className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 topbar-left">
                            <ul className="horizontal-menu d-flex">
                                <li><a href="#"><FaEnvelope className="icon" aria-hidden="true" />Organic@company.com</a></li>
                                <li><a href="#">Free Shipping for all Order of $99</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-6 topbar-right d-flex">
                            <ul className="social-list d-flex">
                                <li><a href=""><FaFacebook className="icon" /></a></li>
                                <li><a href=""><FaTwitter className="icon" /></a></li>
                                <li><a href=""><FaPinterest className="icon" /></a></li>
                            </ul>
                            <ul className="horizontal-menu d-flex">
                                <li className="horz-menu-item">
                                    <select name="currency">
                                        <option value="eur">€ EUR (Euro)</option>
                                        <option value="usd">$ USD (Dollar)</option>
                                        <option value="usd">£ GBP (Pound)</option>
                                        <option value="usd">¥ JPY (Yen)</option>
                                    </select>
                                </li>
                                <li className="horz-menu-item">
                                    <select name="language">
                                        <option value="fr">French (EUR)</option>
                                        <option value="en">English (USD)</option>
                                        <option value="ger">Germany (GBP)</option>
                                        <option value="jp">Japan (JPY)</option>
                                    </select>
                                </li>
                                {/* <li className='d-flex'>
                                    {user ? (
                                        <a href="#" className="nav-link" onClick={onLogout}>Logout</a>
                                    ) : (
                                        <>
                                            <a href="/register" className="nav-link">Registration</a>
                                            <a href="/signin" className="nav-link">SignIn</a>
                                        </>
                                    )}
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="main-header d-flex">
                        <div className="col-lg-3 col-md-2 col-sm-6 navbar-brand">
                            <a href="/" className="logo"><img src={organic4} alt="" /></a>
                        </div>

                        <div className="col-lg-6 col-md-7 hidden-sm navbar-menu">
                            <ul className="d-flex">
                                <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
                                <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
                                <li className="nav-item"><a href="/productslist" className="nav-link">Product</a></li>
                                <li className="nav-item"><a href="/articleslist" className="nav-link">Articles</a></li>
                                <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-3 hidden-sm navbar-icon d-flex">
                            <div className="wishlist ">
                                <a href="#"><span><FaHeart className="icon" /></span></a>
                            </div>
                            <div className="mincart">
                                <a href="/cart"><span><FaCartPlus className="icon" /></span></a>
                                <span className="title">My Cart -</span>
                                <span className="sub-total">$0.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar