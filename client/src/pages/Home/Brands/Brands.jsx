import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import amazon from "../../../assets/brands/amazon.png";
import amazonv from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import monstar from "../../../assets/brands/moonstar.png";
import ranstand from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import starp from "../../../assets/brands/start_people.png";

const brandLogo = [amazon, amazonv, casio, monstar, ranstand, star, starp];

const Brands = () => {
  return (
    <div className="my-15">
      <h1 className="text-secondary text-3xl font-semibold text-center">
        We've helped thousands of sales teams
      </h1>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper my-10"
      >
        {brandLogo.map((logo, index) => (
          <SwiperSlide key={index}>
            <img src={logo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
