import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
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
        console.log("User Data:", userData); // Replace this with actual registration logic
        setTimeout(() => navigate("/signin"), 2000); // Simulate successful registration and navigate
    };

    return (
        <div className="py-12">
            <div className="container mx-auto">
                <div className="breadcrumb">
                    <ul className="flex list-none space-x-2">
                        <li><a href="/" className="text-blue-500">Home</a></li>
                        <li className="text-gray-500">Registration</li>
                    </ul>
                </div>

                <div className="body-content bg-gray-100 rounded-lg p-6">
                    <div className="create-new-account">
                        <h4 className="text-2xl font-semibold">Create a new account</h4>
                        <p className="text-lg text-blue-600">Create your new account.</p>
                        <form className="register-form mt-4" role="form" onSubmit={handleSubmit}>
                            <div className="form-group mb-4">
                                <label htmlFor="username" className="block text-lg">Username <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Username"
                                    id="username"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="email" className="block text-lg">Email Address <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    className="input input-bordered w-full"
                                    placeholder="Email Address"
                                    id="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="firstName" className="block text-lg">First Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="First Name"
                                    id="firstName"
                                    name="first_name"
                                    value={userData.first_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="lastName" className="block text-lg">Last Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    placeholder="Last Name"
                                    id="lastName"
                                    name="last_name"
                                    value={userData.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password" className="block text-lg">Password <span className="text-red-500">*</span></label>
                                <input
                                    type="password"
                                    className="input input-bordered w-full"
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="confirmPassword" className="block text-lg">Confirm Password <span className="text-red-500">*</span></label>
                                <input
                                    type="password"
                                    className="input input-bordered w-full"
                                    placeholder="Confirm Password"
                                    id="confirmPassword"
                                    name="confirm_password"
                                    value={userData.confirm_password}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-full">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
