import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white mt-20">
      <Logo />
      <div className="items-center flex">
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="flex-1">
          <img src={authImg} className="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
