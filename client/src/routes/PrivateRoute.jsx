import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  // console.log(location);

  if (loading) {
    return (
      <div className="flex items-center justify-center ">
        <span className="loading loading-dots loading-2xl"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigate to={"/login"} state={location.pathname} />;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
