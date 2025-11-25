import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import REviewCard from "./REviewCard";
import customerTop from "../../../assets/customer-top.png";

const Reviews = ({ fetchReviews }) => {
  const allReviews = use(fetchReviews);
  // console.log(allReviews);
  return (
    <div className="my-30">
      <div className="text-center py-4 space-y-5 mt-5">
        <img className="mx-auto" src={customerTop} alt="" />
        <h1 className="text-5xl text-secondary font-bold">
          What our customers are sayings
        </h1>
        <p>
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your
          body with ease!
        </p>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 100,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper my-10"
      >
        {allReviews.map((reviews) => (
          <SwiperSlide>
            <REviewCard key={reviews.id} reviews={reviews} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
