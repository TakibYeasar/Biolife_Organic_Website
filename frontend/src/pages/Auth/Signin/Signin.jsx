import React, { useState } from "react";
import "./Signin.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../../../features/auth/authService";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAsync(userData));
  };

  return (
    <div className="section">
      <div className="breadcrumb">
        <h1>Organic Fruits</h1>
      </div>
      <div className="auth-sec">
        <div className="container">
          <div className="boillife-nav d-flex">
            <a href="/" className="home-page">Home</a>
            <span>/</span>
            <a href="/register" className="nav-item">Authentication</a>
          </div>
        </div>

        <div className="auth-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="signin-container">
                  <form onSubmit={handleSubmit} name="frm-login" method="post">
                    <p className="form-group d-grid">
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
                    </p>
                    <p className="form-group d-grid">
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
                    </p>
                    <p className="form-group d-grid">
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
                    </p>
                    <p className="form-row wrap-btn">
                      <button className="btn-style" type="submit">Sign In</button>
                      <a href="#" className="link-to-help">Forgot your password</a>
                    </p>
                  </form>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="register-container">
                  <div className="intro">
                    <h4 className="box-title">New Customer?</h4>
                    <p className="sub-title">Create an account with us and you’ll be able to:</p>
                    <ul className="lis">
                      <li>Check out faster</li>
                      <li>Save multiple shipping addresses</li>
                      <li>Access your order history</li>
                      <li>Track new orders</li>
                      <li>Save items to your Wishlist</li>
                    </ul>
                    <a href="/register" className="btn-style">Create an account</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
