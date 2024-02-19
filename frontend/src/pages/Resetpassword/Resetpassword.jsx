import React from 'react';
import "./Changepassword.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { resetPasswordAsync, selectAuth } from "../authSlice";

// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

const Resetpassword = () => {

    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const { error, status, msg } = useSelector(selectAuth);
    // console.log(msg);
    // const [success, setSuccess] = useState(false);
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm();
    // const query = useQuery();

    // const onSubmit = (data) => {
    //     try {
    //         const { password } = data;
    //         dispatch(
    //             resetPasswordAsync({
    //                 password,
    //                 token: query.get("token"),
    //                 email: query.get("email"),
    //             })
    //         );
    //         setSuccess(true);
    //         setTimeout(() => {
    //             navigate("/login");
    //         }, 3000);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

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
                                        {/* <form action="#" name="frm-login" method="post" onSubmit={handleSubmit(onSubmit)}> */}
                                        <p className="form-row d-grid">
                                            <label for="fid-name">Email Address:<span className="requite">*</span></label>
                                            <input type="text" id="fid-name" name="name" placeholder="Email Address" className="txt-input" />
                                        </p>
                                        <p className="form-row wrap-btn">
                                            <button className="btn-style" type="submit">Submit</button>
                                        </p>

                                        {/* <div className="mt-2">
                                            <input
                                                id="password"
                                                {...register("password", {
                                                    required: "Password is required",
                                                    pattern: {
                                                        // eslint-disable-next-line no-useless-escape
                                                        value:
                                                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                                        message: (
                                                            <span>
                                                                - At least 8 characters
                                                                <br />
                                                                - Must contain at least 1 uppercase letter, 1 lowercase
                                                                letter, and 1 number
                                                                <br />- Can contain special characters
                                                            </span>
                                                        ),
                                                    },
                                                })}
                                                type="password"
                                                autoComplete="current-password"
                                                className="block w-full  dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <p className="text-red-500">
                                                {errors.password && errors.password?.message}
                                            </p>
                                        </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                                        >
                                            Confirm New Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="confirmPassword"
                                            {...register("confirmPassword", {
                                                required: "Confirm-Password is required",
                                                validate: (value, formValues) =>
                                                    value === formValues.password || "Password does not match",
                                            })}
                                            type="password"
                                            required
                                            className="block w-full dark:bg-slate-600 dark:text-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <p className="text-red-500">
                                            {errors.confirmPassword && errors.confirmPassword?.message}
                                        </p>
                                    </div>
                                    {error && <p className="text-red-500">{error}</p>}
                                </div> */}
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