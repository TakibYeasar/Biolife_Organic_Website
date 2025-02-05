import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import {
    AdminDashboard,
    CustomerDashboard,
    FarmerDashboard,
    Homepage,
    AboutPage,
    ArticlesPage,
    ArticleDetails,
    ProductsPage,
    ProductDetails,
    Cart,
    Checkout,
    Contact,
    SignUp,
    EmailVerification,
    SignIn,
    ForgotPassword,
    ChangePassword,
    ResetPassword,
} from '../pages';

const AppRoute = () => {
    return (
        <Routes>
            {/* 🔒 Protected Routes */}
            <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="/customer-dashboard" element={<PrivateRoute><CustomerDashboard /></PrivateRoute>} />
            <Route path="/farmer-dashboard" element={<PrivateRoute><FarmerDashboard /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />

            {/* 🌍 Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/article/:id" element={<ArticleDetails />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-up/verify-email" element={<EmailVerification />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-pass" element={<ForgotPassword />} />
            <Route path="/reset-pass" element={<ResetPassword />} />
            <Route path="/change-pass" element={<ChangePassword />} />
        </Routes>
    );
};

export default AppRoute;
