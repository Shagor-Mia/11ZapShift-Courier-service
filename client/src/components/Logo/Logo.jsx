import React from "react";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-end">
      <img className="-rotate-25" src={logo} alt="" />
      <h1 className="font-bold text-2xl -ms-3">ZapShift</h1>
    </div>
  );
};

export default Logo;
