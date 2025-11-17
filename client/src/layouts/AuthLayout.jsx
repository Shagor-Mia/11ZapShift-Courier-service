import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <Logo />
      <div className="flex">
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="flex-1">
          <img src={authImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
