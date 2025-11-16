import React from "react";
import { FaArrowRight } from "react-icons/fa";

const FAQ = () => {
  return (
    <div className="py-10 max-w-6xl mx-auto space-y-10">
      <div className="text-center space-y-5">
        <h1 className="text-5xl font-bold text-secondary">
          Frequently Asked Question (FAQ)
        </h1>
        <p>
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your
          body with ease!
        </p>
      </div>
      {/* collapse */}
      <div className="max-w-5xl mx-auto space-y-3">
        <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">
            How does this posture corrector work?
          </div>
          <div className="collapse-content text-sm">
            A posture corrector works by providing support and gentle alignment
            to your shoulders, back, and spine, encouraging you to maintain
            proper posture throughout the day. Here’s how it typically
            functions: A posture corrector works by providing support and gentle
            alignment to your shoulders.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">
            Is it suitable for all ages and body types?
          </div>
          <div className="collapse-content text-sm">
            A posture corrector works by providing support and gentle alignment
            to your shoulders, back, and spine, encouraging you to maintain
            proper posture throughout the day. Here’s how it typically
            functions: A posture corrector works by providing support and gentle
            alignment to your shoulders.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">
            Does it really help with back pain and posture improvement?
          </div>
          <div className="collapse-content text-sm">
            A posture corrector works by providing support and gentle alignment
            to your shoulders, back, and spine, encouraging you to maintain
            proper posture throughout the day. Here’s how it typically
            functions: A posture corrector works by providing support and gentle
            alignment to your shoulders.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">
            Does it have smart features like vibration alerts?
          </div>
          <div className="collapse-content text-sm">
            A posture corrector works by providing support and gentle alignment
            to your shoulders, back, and spine, encouraging you to maintain
            proper posture throughout the day. Here’s how it typically
            functions: A posture corrector works by providing support and gentle
            alignment to your shoulders.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">
            How will I be notified when the product is back in stock?
          </div>
          <div className="collapse-content text-sm">
            A posture corrector works by providing support and gentle alignment
            to your shoulders, back, and spine, encouraging you to maintain
            proper posture throughout the day. Here’s how it typically
            functions: A posture corrector works by providing support and gentle
            alignment to your shoulders.
          </div>
        </div>
      </div>
      <div className=" text-center">
        <button className="btn bg-primary text-xl shadow-none border-0 rounded-xl">
          See More FAQ's
        </button>
        <button className="btn rounded-full shadow-none  bg-black py-3 px-2 text-primary">
          <FaArrowRight className="text-xl -rotate-45 " />
        </button>
      </div>
    </div>
  );
};

export default FAQ;
