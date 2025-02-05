import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentUserQuery } from '../store/features/auth/authApi';

const PrivateRoute = ({ children }) => {
    const { data: user, isLoading, error } = useCurrentUserQuery();
    const isAuthenticated = !!user;

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state while fetching user data
    }

    if (error || !isAuthenticated) {
        return <Navigate to="/sign-in" replace />; // Redirect to sign-in if unauthenticated
    }

    return children;
};

export default PrivateRoute;
