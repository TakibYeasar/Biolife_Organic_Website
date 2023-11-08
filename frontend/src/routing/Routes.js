import React from "react";
import { Route, Routes } from "react-router-dom";
import { AllBlogs, AllProducts, Blogview, Productview, Aboutus, Authenticate, Registration, Cart, Checkout, Contact, Homepage } from "./pages";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <section className="container">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/allblogs" element={<AllBlogs />} />
        <Route path="/blogview" element={<Blogview />} />
        <Route path="/allprods" element={<AllProducts />} />
        <Route path="/prodview" element={<Productview />} />
        <Route path="/auth" element={<Authenticate />} />
        <Route path="/register" element={<Registration />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </section>
  );
};

export default Routes;
