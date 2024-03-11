import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, isLoading, isAuthenticated } = useSelector((state) => state.auth);

  // Handle loading state (optional)
  if (isLoading) {
    // You can render a loading indicator here (e.g., a spinner)
    return <div>Loading...</div>; // Corrected: add curly brace `{`
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
