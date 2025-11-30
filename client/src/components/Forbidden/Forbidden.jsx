import React from "react";
import { Link, useNavigate } from "react-router";

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>forbidden</h1>
      <Link className="btn" to={"/"}>
        back to home
      </Link>
      <button className="btn" onClick={() => navigate(-1)}>
        previous page
      </button>
    </div>
  );
};

export default Forbidden;
