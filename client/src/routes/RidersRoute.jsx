import React from "react";
import { useAuth } from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const RidersRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { roleLoading, role } = useRole();
  console.log(role);

  // console.log(location);

  if (loading || !user || roleLoading) {
    return (
      <div className="flex items-center justify-center ">
        <span className="loading loading-dots loading-2xl"></span>
      </div>
    );
  }
  if (role !== "rider") {
    return <Forbidden />;
  }
  return <div>{children}</div>;
};

export default RidersRoute;
