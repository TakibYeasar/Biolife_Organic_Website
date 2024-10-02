import React, { useState } from "react";

const Signin = () => {
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
    // Dummy data submission simulation
    console.log("User Data Submitted:", userData);
    // Here you could navigate to another page or show a success message
  };

  return (
    <div className="section">
      <div className="breadcrumb">
        <h1 className="text-3xl font-bold">Organic Fruits</h1>
      </div>
      <div className="auth-sec py-10">
        <div className="container mx-auto px-4">
          <nav className="flex mb-4">
            <a href="/" className="text-blue-600 hover:underline">
              Home
            </a>
            <span className="mx-2">/</span>
            <a href="/register" className="text-blue-600 hover:underline">
              Authentication
            </a>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sign In Container */}
            <div className="signin-container p-6 border border-gray-300 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label className="block text-sm font-medium mb-2" htmlFor="username">
                    Username <span className="text-red-500">*</span>
                  </label>
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
                  <label className="block text-sm font-medium mb-2" htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </label>
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
                  <label className="block text-sm font-medium mb-2" htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </label>
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
                <div className="form-row flex justify-between items-center mb-4">
                  <button className="btn btn-primary" type="submit">Sign In</button>
                  <a href="#" className="text-blue-600 hover:underline">Forgot your password?</a>
                </div>
              </form>
            </div>

            {/* Register Container */}
            <div className="register-container p-6 border border-gray-300 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4">New Customer?</h4>
              <p className="mb-2">Create an account with us and you’ll be able to:</p>
              <ul className="list-disc list-inside mb-4">
                <li>Check out faster</li>
                <li>Save multiple shipping addresses</li>
                <li>Access your order history</li>
                <li>Track new orders</li>
                <li>Save items to your Wishlist</li>
              </ul>
              <a href="/register" className="btn btn-secondary">Create an account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
