import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center ">
        <span className="loading loading-dots loading-2xl"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
