"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function Slider() {
  return (
    <div className="relative container mx-auto">
      {/* Navigation Buttons Outside Swiper at Top-Right */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          className="bg-gray-800 text-white p-3 rounded-full"
          id="prevSlide"
        >
          <FaArrowLeft size={20} />
        </button>
        <button
          className="bg-gray-800 text-white p-3 rounded-full"
          id="nextSlide"
        >
          <FaArrowRight size={20} />
        </button>
      </div>

      {/* Swiper Slider */}
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={{
          nextEl: "#nextSlide",
          prevEl: "#prevSlide",
        }}
        modules={[Navigation]}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <SwiperSlide key={index}>
            <img
              src={`https://swiperjs.com/demos/images/nature-${(index % 3) + 1}.jpg`}
              className="w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
