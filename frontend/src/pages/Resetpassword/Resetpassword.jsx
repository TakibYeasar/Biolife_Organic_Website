import React from 'react';
import "./Changepassword.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";

const Resetpassword = () => {

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
                      <a href="/register" className="nav-item">Reset Password</a>
                  </div>
              </div>

              <div className="auth-sec">
                  <div className="container">
                      <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                              <div className="signin-container">
                                  <form action="#" name="frm-login" method="post">
                                      <p className="form-row d-grid">
                                          <label for="fid-name">Email Address:<span className="requite">*</span></label>
                                          <input type="text" id="fid-name" name="name" placeholder="Email Address" className="txt-input" />
                                      </p>
                                      <p className="form-row wrap-btn">
                                          <button className="btn-style" type="submit">Submit</button>
                                      </p>
                                  </form>
                              </div>
                          </div>

                      </div>

                  </div>

              </div>

          </div>
      </div>
  )
}

export default Resetpassword