import React from "react";
import img1 from "../../../assets/live-tracking.png";
import img2 from "../../../assets/safe-delivery.png";

const AboutUs = () => {
  const deliveries = [
    {
      image: img1,
      title: "Live Parcel Tracking",
      description:
        "Track your parcel in real time with precise location updates, detailed movement history, and instant notifications, ensuring you always know exactly where your delivery is.",
    },
    {
      image: img2,
      title: "100% Safe Delivery",
      description:
        "We guarantee safe delivery through careful handling, secure packaging, verified riders, and end-to-end monitoring, making sure your parcel reaches its destination without any damage.",
    },
    {
      image: img2,
      title: "24/7 Call Center Support",
      description:
        "Our friendly customer service team is available around the clock to help with tracking issues, delivery questions, or any urgent support you may need at any time.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto ">
      <div className="border-t-2 my-20 border-gray-500 border-dashed"></div>
      {deliveries.map((delivery, index) => (
        <div
          key={index}
          className="bg-white px-10 py-5 rounded-xl shadow-sm flex flex-row gap-10 mt-3"
        >
          <div className="">
            <img src={delivery.image} alt="" />
          </div>
          <div className="border-l-2 my-3 border-gray-500 border-dashed"></div>
          <div className="py-0 flex flex-col justify-center space-y-2">
            <h1 className="text-2xl text-secondary font-bold">
              {delivery.title}
            </h1>
            <p>{delivery.description}</p>
          </div>
        </div>
      ))}
      <div className="border-t-2 my-20 border-gray-500 border-dashed"></div>
    </div>
  );
};

export default AboutUs;
