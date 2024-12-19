import React from 'react';
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar, Footer } from "./components";
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
  SignUp,
  EmailVerification,
  SignIn,
  ForgotPassword,
  ChangePassword,
  ResetPassword
} from "./pages";
import { useDispatch } from 'react-redux';
import { useCurrentUserQuery } from './redux/features/auth/authApi';

function App() {

  const dispatch = useDispatch();
  const { data: user, isLoading, error } = useCurrentUserQuery();

  const isAuthenticated = !!user; // Boolean indicating authentication status

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return <div>Loading...</div>; // Show a loading indicator while fetching user data
    }

    if (error) {
      return <Navigate to="/sign-in" replace />; // Redirect to sign-in on error
    }

    return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
  };

  return (
      <BrowserRouter>
      {/* Navbar receives user and authentication status */}
      <Navbar user={user} isAuthenticated={isAuthenticated} />
      <Routes>
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer-dashboard"
          element={
            <ProtectedRoute>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-up/verify-email" element={<EmailVerification />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-pass" element={<ForgotPassword />} />
        <Route path="/reset-pass" element={<ResetPassword />} />
        <Route path="/change-pass" element={<ChangePassword />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
