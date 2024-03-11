import React from "react";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "../../../features/auth/authSlice";

const Signin = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: e.target.name.value,
      password: e.target.password.value
    };
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
                    <p className="form-row d-grid">
                      <label htmlFor="fid-name">Email Address:<span className="requite">*</span></label>
                      <input type="text" id="fid-name" name="name" placeholder="Email Address" className="txt-input" autoComplete="email" required />
                    </p>
                    <p className="form-row d-grid">
                      <label htmlFor="fid-pass">Password:<span className="requite">*</span></label>
                      <input type="password" id="fid-pass" name="password" placeholder="Password" className="txt-input" autoComplete="current-password" required />
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
