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
            {/* 🔒 Role-Based Protected Routes */}
            <Route
                path="/admin-dashboard"
                element={
                    <PrivateRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/customer-dashboard"
                element={
                    <PrivateRoute allowedRoles={['customer']}>
                        <CustomerDashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/farmer-dashboard"
                element={
                    <PrivateRoute allowedRoles={['farmer']}>
                        <FarmerDashboard />
                    </PrivateRoute>
                }
            />

            {/* 🔒 Authenticated User Routes */}
            <Route
                path="/cart"
                element={
                    <PrivateRoute allowedRoles={['customer', 'farmer', 'admin']}>
                        <Cart />
                    </PrivateRoute>
                }
            />
            <Route
                path="/checkout"
                element={
                    <PrivateRoute allowedRoles={['customer', 'farmer', 'admin']}>
                        <Checkout />
                    </PrivateRoute>
                }
            />

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
