import React from "react";
import { FaQuoteRight } from "react-icons/fa";

const REviewCard = ({ reviews }) => {
  const { review, user_photoURL, userName, user_email } = reviews;
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm p-7 flex flex-col h-full ">
        <div className="space-y-5">
          <FaQuoteRight className="text-3xl text-gray-400" />
          <p className="">{review}</p>
          <div className="border-t-2 border-dashed  border-gray-200"></div>
        </div>
        <div className="flex items-center justify-start  gap-4 py-5">
          <div className=" h-12 w-12 ">
            <img className="rounded-full" src={user_photoURL} alt="" />
          </div>
          <div>
            <h2 className="text-2xl text-secondary font-bold">{userName}</h2>
            <p>{user_email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default REviewCard;
