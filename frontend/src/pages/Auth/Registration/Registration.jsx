import React, { useState } from "react";
import "./Registration.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
// import { Link, Navigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     createUserAsync,
//     selectAuth,
//     verifyMailAgainAsync,
// } from "../authSlice";
// import { toast } from "react-toastify";


const Registration = () => {

    // const dispatch = useDispatch();
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm();
    // const { user, errorSignUp, status, msg } = useSelector(selectAuth);

    // const [emailValue, setEmailValue] = useState("");
    // const [showButton, setShowButton] = useState(false);

    // const onSubmit = (data) => {
    //     setEmailValue(data.email);
    //     try {
    //         dispatch(
    //             createUserAsync({
    //                 email: data.email,
    //                 password: data.password,
    //             })
    //         );
    //         setShowButton(true);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const sendVerificationMail = async () => {
    //     if (!emailValue) {
    //         toast.error("Please enter your email address");
    //         return;
    //     }

    //     try {
    //         await dispatch(verifyMailAgainAsync({ email: emailValue }));
    //         setShowButton(false);
    //     } catch (error) {
    //         console.error("Error sending verification email:", error);
    //     }
    // };

    


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
                                  <form className="register-form outer-top-xs" role="form" onSubmit={handleSubmit(onSubmit)}>
                                      <div className="form-group">
                                          <label className="info-title" for="exampleInputEmail2">Email Address <span>*</span></label>
                                          <input type="email" className="form-control unicase-form-control text-input" placeholder="Email Address" id="exampleInputEmail2" />
                                      </div>
                                      {/* <div className="form-group">
                                          <label className="info-title" for="exampleInputEmail2">Email Address <span>*</span></label>
                                          <input {...register("email", {
                                              required: "Email Address is required",
                                              pattern: {
                                                  // eslint-disable-next-line no-useless-escape
                                                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                                  message: "Email not valid",
                                              },
                                          })} type="email" className="form-control unicase-form-control text-input" placeholder="Email Address" id="exampleInputEmail2" />
                                          <p className="text-red-500">
                                              {errors.email && errors.email?.message}
                                          </p>
                                      </div> */}
                                      <div className="form-group">
                                          <label className="info-title" for="exampleInputEmail1">Name <span>*</span></label>
                                          <input type="email" className="form-control unicase-form-control text-input" placeholder="Name" id="exampleInputEmail1" />
                                      </div>
                                      <div className="form-group">
                                          <label className="info-title" for="exampleInputEmail1">Phone Number <span>*</span></label>
                                          <input type="email" className="form-control unicase-form-control text-input" placeholder="Phone Number" id="exampleInputEmail1" />
                                      </div>
                                      <div className="form-group">
                                          <label className="info-title" for="exampleInputEmail1">Password <span>*</span></label>
                                          <input type="email" className="form-control unicase-form-control text-input" placeholder="Password" id="exampleInputEmail1" />
                                      </div>
                                      {/* <div className="form-group">
                                          <label className="info-title" for="exampleInputEmail1">Password <span>*</span></label>
                                          <input {...register("password", {
                                              required: "Password is required",
                                              pattern: {
                                                  // eslint-disable-next-line no-useless-escape
                                                  value:
                                                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                                  message: (
                                                      <span>
                                                          - At least 8 characters
                                                          <br />
                                                          - Must contain at least 1 uppercase letter, 1
                                                          lowercase letter, and 1 number
                                                          <br />- Can contain special characters
                                                      </span>
                                                  ),
                                              },
                                          })} type="email" className="form-control unicase-form-control text-input" placeholder="Password" id="exampleInputEmail1" />
                                          <p className="text-red-500">
                                              {errors.password && errors.password?.message}
                                          </p>
                                      </div> */}
                                      <div className="form-group">
                                          <label className="info-title" for="exampleInputEmail1">Confirm Password <span>*</span></label>
                                          <input type="email" className="form-control unicase-form-control text-input" placeholder="Confirm Password" id="exampleInputEmail1" />
                                      </div>
                                      {/* <div className="form-group">
                                          <label className="info-title" for="exampleInputEmail1">Confirm Password <span>*</span></label>
                                          <input {...register("confirmPassword", {
                                              required: "Confirm-Password is required",
                                              validate: (value, formValues) =>
                                                  value === formValues.password ||
                                                  "Password does not match",
                                          })} type="email" className="form-control unicase-form-control text-input" placeholder="Confirm Password" id="exampleInputEmail1" />
                                          <p className="text-red-500">
                                              {errors.confirmPassword && errors.confirmPassword?.message}
                                          </p>
                                      </div> */}
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