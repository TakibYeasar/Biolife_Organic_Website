import React, { useState } from "react";
// import { Link, Redirect } from "react-router-dom";
import "./Authenticate.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
// import { useSelector, useDispatch } from "react-redux";
// import { login, reset } from "../features/auth/authSlice";
// import Spinner from "../components/Spinner";
// import { toast } from "react-toastify";

const Authenticate = () => {

  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const { email, password } = formData;

  // const navigation = useNavigate();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }
  //   if (isSuccess || user) {
  //     navigate("/");
  //   }
  //   dispatch(reset());
  // }, [user, isError, isSuccess, message, navigation, dispatch]);
  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const userData = { email, password };
  //   dispatch(login());
  // };
  // if (isLoading) {
  //   return <Spinner />;
  // }

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
                  <form action="#" name="frm-login" method="post" >
                  {/* <form action="#" name="frm-login" method="post" onSubmit={onSubmit}> */}
                    <p className="form-row d-grid">
                      <label for="fid-name">Email Address:<span className="requite">*</span></label>
                      <input type="text" id="fid-name" name="name" placeholder="Email Address" className="txt-input" />
                      {/* <input type="text" id="fid-name" name="name" placeholder="Email Address" className="txt-input" onChange={onChange} /> */}
                    </p>
                    <p className="form-row d-grid">
                      <label for="fid-pass">Password:<span className="requite">*</span></label>
                      {/* <input type="text" id="fid-pass" name="password" placeholder="Password" className="txt-input" onChange={onChange} /> */}
                      <input type="text" id="fid-pass" name="password" placeholder="Password" className="txt-input" />
                    </p>
                    <p className="form-row wrap-btn">
                      <button className="btn-style" type="submit">sign in</button>
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
                      <li>Save multiple shipping anddesses</li>
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
  )
}

export default Authenticate