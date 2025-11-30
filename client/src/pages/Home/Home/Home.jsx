import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../Banner/HowItWorks";
import OurServiceSection from "./OurServiceSection";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";
import AboutUs from "../Reviews/AboutUs";
import CustomerPriority from "../Reviews/CustomerPriority";
import FAQ from "./FAQ";

const fetchReviews = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner />
      <Brands />
      <HowItWorks />
      <OurServiceSection />
      <AboutUs />
      <CustomerPriority />
      <Reviews fetchReviews={fetchReviews} />
      <FAQ />
    </div>
  );
};

export default Home;
