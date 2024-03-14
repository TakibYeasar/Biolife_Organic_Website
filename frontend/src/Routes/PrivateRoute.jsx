import React from "react";
import { Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoading, selectIsError, selectUser } from '../features/auth/authSlice';
const PrivateRoute = ({ component: Component, ...rest }) => {
  
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching user.</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? (
          <Navigate to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
