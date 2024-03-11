import React from "react";
import { Route, Routes } from "react-router-dom";
import { Homepage, Aboutus, Articleslist, Articleview, Productslist, Productview, Contact, Registration, Signin, Changepassword, Resetpassword, Cart, Checkout } from "../pages";
// import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <section className="container">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/articleslist" element={<Articleslist />} />
        <Route path="/articleview/:id" element={<Articleview />} />
        <Route path="/productslist" element={<Productslist />} />
        <Route path="/productview/:id" element={<Productview />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/changepass" element={<Changepassword />} />
        <Route path="/resetpass" element={<Resetpassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <PrivateRoute path="/changepass" element={<Changepassword />} />
        <PrivateRoute path="/resetpass" element={<Resetpassword />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/checkout" element={<Checkout />} /> */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </section>
  );
};

export default AppRoutes;
