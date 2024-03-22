import React, { useState } from "react";
import "./Registration.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAsync } from "../../../features/auth/authService";
import { selectCurrentUser } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(selectCurrentUser);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: "",
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUserAsync(userData));
    };

    if (user) {
        return (
            <div className="registrations_sec">
                <div className="container">
                    <div className="alert alert-success" role="alert">
                        Registration successful! Please proceed to login.
                    </div>
                    {setTimeout(() => navigate("/signin"), 2000)}
                </div>
            </div>
        );
    } else {
        return (
            <div className="registrations_sec">
                <div className="container">
                    <div className="breadcrumb">
                        <div className="row">
                            <div className="breadcrumb-inner">
                                <ul className="list-inline list-unstyled">
                                    <li><a href="home.html">Home</a></li>
                                    <li className='active'>Registration</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="body-content">
                        <div className="row">
                            <div className="sign-in-page">
                                <div className="row">
                                    <div className=" col-lg-12 col-md-6 col-sm-6 create-new-account">
                                        <h4 className="checkout-subtitle">Create a new account</h4>
                                        <p className="text title-tag-line">Create your new account.</p>
                                        <form className="register-form outer-top-xs" role="form" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label className="info-title" htmlFor="username">Username <span>*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control unicase-form-control text-input"
                                                    placeholder="Username"
                                                    id="username"
                                                    name="username"
                                                    value={userData.username}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="info-title" htmlFor="email">Email Address <span>*</span></label>
                                                <input
                                                    type="email"
                                                    className="form-control unicase-form-control text-input"
                                                    placeholder="Email Address"
                                                    id="email"
                                                    name="email"
                                                    value={userData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="info-title" htmlFor="firstName">First Name <span>*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control unicase-form-control text-input"
                                                    placeholder="First Name"
                                                    id="firstName"
                                                    name="first_name"
                                                    value={userData.first_name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="info-title" htmlFor="lastName">Last Name <span>*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control unicase-form-control text-input"
                                                    placeholder="Last Name"
                                                    id="lastName"
                                                    name="last_name"
                                                    value={userData.last_name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="info-title" htmlFor="password">Password <span>*</span></label>
                                                <input
                                                    type="password"
                                                    className="form-control unicase-form-control text-input"
                                                    placeholder="Password"
                                                    id="password"
                                                    name="password"
                                                    value={userData.password}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="info-title" htmlFor="confirmPassword">Confirm Password <span>*</span></label>
                                                <input
                                                    type="password"
                                                    className="form-control unicase-form-control text-input"
                                                    placeholder="Confirm Password"
                                                    id="confirmPassword"
                                                    name="confirm_password"
                                                    value={userData.confirm_password}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <button type="submit" className="btn-upper btn btn-primary checkout-page-button">Sign Up</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Registration;
