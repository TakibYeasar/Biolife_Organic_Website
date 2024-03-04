import React from "react";
import { Route, Routes } from "react-router-dom";
import { Homepage, Aboutus, Articleslist, Articleview, Productslist, Productview, Contact, Registration, Signin, Changepassword, Resetpassword } from "./pages";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <section className="container">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/allblogs" element={<Articleslist />} />
        <Route path="/blogview" element={<Articleview />} />
        <Route path="/allprods" element={<Productslist />} />
        <Route path="/prodview" element={<Productview />} />
        <Route path="/auth" element={<Signin />} />
        <Route path="/register" element={<Registration />} />
        <PrivateRoute path="/register" element={<Changepassword />} />
        <PrivateRoute path="/register" element={<Resetpassword />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </section>
  );
};

export default Routes;
