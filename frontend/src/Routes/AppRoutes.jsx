import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AdminDashboard,
  CustomerDashboard,
  FarmerDashboard,
  Homepage,
  About,
  Articles,
  ArticleDetails,
  Products,
  ProductDetails,
  Cart,
  Checkout,
  Contact,
  Signup,
  Signin,
  Changepassword,
  Forgotpassword,
} from "../pages";

const AppRoutes = () => {
  return (
    <section className="container">
      <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />

        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/changepassword" element={<Changepassword />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </section>
  );
};

export default AppRoutes;
