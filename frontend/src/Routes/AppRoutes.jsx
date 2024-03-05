import React from "react";
import { Route, Routes } from "react-router-dom";
import { Homepage, Aboutus, Articleslist, Articleview, Productslist, Productview, Contact, Registration, Signin, Changepassword, Resetpassword } from "../pages";
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
        <Route path="/productview" element={<Productview />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Registration />} />
        {/* <PrivateRoute path="/changepass" element={<Changepassword />} /> */}
        {/* <PrivateRoute path="/resetpass" element={<Resetpassword />} /> */}
        {/* <PrivateRoute path="/cart" element={<Cart />} /> */}
        {/* <PrivateRoute path="/checkout" element={<Checkout />} /> */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </section>
  );
};

export default AppRoutes;
