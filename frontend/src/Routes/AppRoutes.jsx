import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Homepage, Aboutus, Articleslist, Articleview, Productslist, Productview, Contact, Registration, Signin, Changepassword, Resetpassword, Cart, Checkout, AdminDashboard, UserDashboard } from "../pages";

const AppRoutes = () => {
  return (
    <section className="container">
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />


        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/articleslist" element={<Articleslist />} />
        <Route path="/articleview/:id" element={<Articleview />} />
        <Route path="/productslist" element={<Productslist />} />
        <Route path="/productview/:id" element={<Productview />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/changepass" element={<Changepassword />}/>
        <Route path="/resetpass" element={<Resetpassword />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/checkout" element={<Checkout />}/>

      </Routes>
    </section>
  );
};

export default AppRoutes;
