import React from "react";
import { Link } from "react-router";

const PaymentFailed = () => {
  return (
    <div className="py-10 mx-auto max-w-6xl">
      <h2 className="text-4xl font-bold">
        Payment Cancelled. Please try Again
      </h2>
      <Link to="/dashboard/my-parcels">
        <button className="btn btn-primary text-black">Try Again</button>
      </Link>
    </div>
  );
};

export default PaymentFailed;
