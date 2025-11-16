import React from "react";
import logo from "../../../assets/bookingIcon.png";

const HowItWorks = () => {
  const works = [
    {
      logo: logo,
      title: "Booking Pick & Drop",
      descriptions:
        "Our pick and drop booking service ensures quick, safe, and reliable parcel collection and delivery, giving customers a smooth and hassle-free experience every time.",
    },
    {
      logo: logo,
      title: "Cash on Delivery",
      descriptions:
        "With our secure cash on delivery service, customers can confidently pay upon receiving their items, providing greater trust, convenience, and flexibility for both buyers and sellers.",
    },
    {
      logo: logo,
      title: "Delivery Hub",
      descriptions:
        "Our delivery hub system manages parcels efficiently by sorting, tracking, and dispatching them through the optimal routes to ensure faster and more organized delivery operations.",
    },
    {
      logo: logo,
      title: "Booking SME & Corporate",
      descriptions:
        "We offer tailored booking solutions specifically designed for SMEs and corporate clients, ensuring reliable logistics support that enhances business operations and customer satisfaction.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold py-7">How its Work</h1>
      <div className=" grid grid-cols-4 gap-2">
        {works.map((work, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm p-5 flex flex-col h-full transform transition duration-300 hover:scale-103 ease-in-out hover:shadow-md"
          >
            <img
              src={work.logo}
              className="h-12 w-12 object-contain mb-4"
              alt=""
            />
            <div className="flex-1 flex flex-col space-y-2">
              <h3 className="text-2xl text-secondary font-semibold">
                {work.title}
              </h3>
              <p className="">{work.descriptions}</p>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
