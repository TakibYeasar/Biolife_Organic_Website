import React, { useState } from "react";
import "./Signin.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
// import { Link, Navigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUserAsync, selectAuth } from "../authSlice";

// 02
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { loginUser, registerUser } from '../redux/slices/userSlice';

// const initialState = {
//   username: '',
//   password: '',
//   isMember: true,
// };


const Signin = () => {

  // const dispatch = useDispatch();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  // const { user, errorLogin, status } = useSelector(selectAuth);

  // const onSubmit = (data) => {
  //   try {
  //     dispatch(loginUserAsync({ email: data.email, password: data.password }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // if (user) {
  //   return <Navigate to="/admin" replace={true} />;
  // }

  // 02
  // const [values, setValues] = useState(initialState);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const dispatch = useDispatch();
  // const { isLoading, isAuthenticated } = useSelector((store) => store.user);
  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name } = e.target;
  //   const { value } = e.target;
  //   setValues({ ...values, [name]: value });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const { username, password } = values;
  //   if (!username || !password) {
  //     toast.error('Please fill out all Fields');
  //   } else if (values.isMember) {
  //     dispatch(loginUser({ username, password }));
  //   } else {
  //     dispatch(registerUser({ username, password }));
  //   }
  // };

  // const toggleMember = () => {
  //   setValues({ ...values, isMember: !values.isMember });
  // };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     setIsLoggedIn(true);
  //     navigate('/');
  //   }
  // }, [navigate, isAuthenticated]);

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
                  <form action="#" name="frm-login" method="post" onSubmit={handleSubmit(onSubmit)}>
                    <p className="form-row d-grid">
                      <label for="fid-name">Email Address:<span className="requite">*</span></label>
                      <input type="text" id="fid-name" name="name" placeholder="Email Address" className="txt-input" autoComplete="email" required />
                    </p>
                    {/* <p className="form-row d-grid">
                      <label for="fid-name">Email Address:<span className="requite">*</span></label>
                      <input {...register("email", { required: "Email Address is required", })} type="text" id="fid-name" name="name" placeholder="Email Address" className="txt-input" autoComplete="email" required />
                      <p className="error">{errors.email && errors.email?.message}</p>
                    </p> */}
                    <p className="form-row d-grid">
                      <label for="fid-pass">Password:<span className="requite">*</span></label>
                      <input type="text" id="fid-pass" name="password" placeholder="Password" className="txt-input" autoComplete="current-password" required />
                    </p>
                    {/* <p className="form-row d-grid">
                      <label for="fid-pass">Password:<span className="requite">*</span></label>
                      <input {...register("password", { required: "Password is required", })} type="text" id="fid-pass" name="password" placeholder="Password" className="txt-input" autoComplete="current-password" required />
                      <p className="error">{errors.password && errors.password?.message}</p>
                    </p> */}

                    {/* 02
                    <label className="input-group input-group-vertical">
                    <span className="bg-green-500 text-white font-bold">Password</span>
                    <input
                      type="password"
                      value={values.password}
                      name="password"
                      onChange={handleChange}
                      className="input input-bordered focus:outline-none"
                    />
                  </label> */}
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

export default Signin