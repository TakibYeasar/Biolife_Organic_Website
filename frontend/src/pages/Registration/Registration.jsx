import React, { useState } from "react";
// import { Link, Redirect } from "react-router-dom"
import "./Registration.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useSelector, useDispatch } from "react-redux";
// import { register, reset } from "../features/auth/authSlice";
// import Spinner from "../components/Spinner";


const Registration = () => {

    // const [formData, setFormData] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    //     password2: "",
    // });

    // const { name, email, password, password2 } = formData;

    // const navigation = useNavigate();
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const { user, isLoading, isError, isSuccess, message } = useSelector(
    //     (state) => state.auth
    // );

    // useEffect(() => {
    //     if (isError) {
    //         toast.error(message);
    //     }
    //     if (isSuccess || user) {
    //         navigate("/");
    //     }
    //     dispatch(reset());
    // }, [user, isError, isSuccess, message, navigation, dispatch]);
    // const onChange = (e) => {
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    // };
    // const onSubmit = (e) => {
    //     e.preventDefault();

    //     if (password !== password2) {
    //         toast.error("Password do not match");
    //     } else {
    //         const userData = {
    //             Name: name,
    //             Email: email,
    //             Password: password,
    //         };
    //         dispatch(register(userData));
    //     }
    // };

    // if (isLoading) {
    //     return <Spinner />;
    // }


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
                                  <form className="register-form outer-top-xs" role="form">
                                  {/* <form className="register-form outer-top-xs" role="form" onSubmit={onSubmit}> */}
                                      <div className="form-group">
                                          <label className="info-title" for="exampleInputEmail2">Email Address <span>*</span></label>
                                          <input type="email" className="form-control unicase-form-control text-input" placeholder="Email Address" id="exampleInputEmail2" />
                                          {/* <input type="email" className="form-control unicase-form-control text-input" placeholder="Email Address" id="exampleInputEmail2" onChange={onChange} /> */}
                                      </div>
                                      <div className="form-group">
                                          <label className="info-title" for="exampleInputEmail1">Name <span>*</span></label>
                                          <input type="email" className="form-control unicase-form-control text-input" placeholder="Name" id="exampleInputEmail1" />
                                          {/* <input type="email" className="form-control unicase-form-control text-input" placeholder="Name" id="exampleInputEmail1" onChange={onChange} /> */}
                                      </div>
                                      <div className="form-group">
                                          <label className="info-title" for="exampleInputEmail1">Phone Number <span>*</span></label>
                                          <input type="email" className="form-control unicase-form-control text-input" placeholder="Phone Number" id="exampleInputEmail1" />
                                          {/* <input type="email" className="form-control unicase-form-control text-input" placeholder="Phone Number" id="exampleInputEmail1" onChange={onChange} /> */}
                                      </div>
                                      <div className="form-group">
                                          <label className="info-title" for="exampleInputEmail1">Password <span>*</span></label>
                                          <input type="email" className="form-control unicase-form-control text-input" placeholder="Password" id="exampleInputEmail1" />
                                          {/* <input type="email" className="form-control unicase-form-control text-input" placeholder="Password" id="exampleInputEmail1" onChange={onChange} /> */}
                                      </div>
                                      <div className="form-group">
                                          <label className="info-title" for="exampleInputEmail1">Confirm Password <span>*</span></label>
                                          <input type="email" className="form-control unicase-form-control text-input" placeholder="Confirm Password" id="exampleInputEmail1" />
                                          {/* <input type="email" className="form-control unicase-form-control text-input" placeholder="Confirm Password" id="exampleInputEmail1" onChange={onChange} /> */}
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
  )
}

export default Registration