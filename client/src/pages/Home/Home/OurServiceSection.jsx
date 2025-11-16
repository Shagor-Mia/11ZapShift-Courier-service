import React from "react";
import serviceLogo from "../../../assets/service.png";

const OurServiceSection = () => {
  const services = [
    {
      image: serviceLogo,
      title: "Express & Standard Delivery",
      description:
        "Fast express delivery for urgent parcels and reliable standard delivery for everyday shipments, ensuring your packages always reach the right destination safely and on time.",
    },
    {
      image: serviceLogo,
      title: "Nationwide Delivery",
      description:
        "Our nationwide delivery network covers all major cities and districts, offering seamless parcel movement across the country with dependable tracking and timely arrival.",
    },
    {
      image: serviceLogo,
      title: "Fulfillment Solution",
      description:
        "A complete fulfillment service including storage, packaging, and distribution, helping businesses manage inventory and order processing with maximum efficiency and speed.",
    },
    {
      image: serviceLogo,
      title: "Cash on Home Delivery",
      description:
        "Customers can conveniently pay in cash upon receiving parcels at their doorstep, reducing friction and making deliveries safer, easier, and more trustworthy for everyone.",
    },
    {
      image: serviceLogo,
      title: "Corporate Service / Contract In Logistics",
      description:
        "Tailored logistics solutions for corporate clients, offering consistent delivery support, dedicated handling, and long-term contract options designed to meet business needs effectively.",
    },
    {
      image: serviceLogo,
      title: "Parcel Return",
      description:
        "A simple and efficient parcel return system that helps customers and businesses manage exchanges and returns without hassle, ensuring a smooth and reliable reverse logistics process.",
    },
  ];

  return (
    <div className="bg-secondary rounded-2xl py-15 mt-20">
      <div className=" text-center space-y-3  text-gray-100">
        <h1 className="text-5xl font-bold">Our Service</h1>
        <p>
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br />
          business shipments — we deliver on time, every time.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-3 py-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl text-center shadow-sm p-5 flex flex-col h-full transform transition duration-300 hover:scale-103 ease-in-out hover:shadow-md hover:bg-primary"
          >
            <img
              src={service.image}
              className="md:h-24 md:w-24 w-12 h-12 p-3 bg-gradient-to-b from-[#efeefc] to-[#fdfdff] md:p-6 rounded-full items-center object-contain mb-4 mx-auto"
              alt=""
            />
            <div className="flex-1 flex flex-col space-y-2">
              <h3 className="text-2xl text-secondary font-semibold">
                {service.title}
              </h3>
              <p className="">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServiceSection;
