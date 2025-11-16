import React from "react";
import img1 from "../../../assets/merchant-bg.png";
import img2 from "../../../assets/location-merchant.png";

const CustomerPriority = () => {
  return (
    <div className="max-w-6xl mx-auto bg-secondary rounded-2xl">
      <div>
        <img src={img1} alt="" />

        <div className="flex justify-between -mt-20 items-center px-10 pb-20">
          {/* Text Section */}
          <div className="flex-1 space-y-8">
            <h1 className="text-4xl font-bold text-white">
              Merchant and Customer Satisfaction is Our First Priority
            </h1>
            <p className="text-gray-100">
              We offer the lowest delivery charge with the highest value along
              with <br /> 100% safety of your product. Pathao courier delivers
              your parcels in every corner of Bangladesh right on time.
            </p>
            <div className="flex gap-3">
              <button className="btn bg-primary shadow-none border-0 rounded-full">
                Became a merchant
              </button>
              <button className="btn rounded-full shadow-none border-primary btn-outline text-primary">
                Earn with ZapShift
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="">
            <img src={img2} className="w-full max-w-md h-auto" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPriority;
