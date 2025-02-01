"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

export default function ShopCategories() {
  const swiperRef = useRef(null);
  const [shopCategories, setShopCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`/JsonApi/ShopCategories.json`)
      .then((response) => setShopCategories(response.data))
      .catch((error) => {
        console.error("Error fetching shop categories:", error);
      });
  }, []); 

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="relative container pt-[100px] px-4">
      {/* Buttons Top-Right */}
      <div className="flex justify-between gap-2 mb-[50px]">
        <h1 className="sm:text-[40px] text-[30px] font-jost font-normal">
          Shop by Categories
        </h1>
        <div className="flex gap-2 mb-4 ">
          <button
            className="bg-gray-800 text-white p-5 rounded-[10px] z-40 hidden sm:block"
            onClick={handlePrevSlide}
          >
            <FaArrowLeft className="w-6 h-6" />
          </button>
          <button
            className="bg-gray-800 text-white p-5 rounded-[10px] z-40 hidden sm:block"
            onClick={handleNextSlide}
          >
            <FaArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Swiper Slider */}
      <Swiper
        loop={true}
        spaceBetween={10}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 5 },
          480: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1240: { slidesPerView: 4, spaceBetween: 20 },
        }}
        modules={[Navigation]}
      >
        {shopCategories.length === 0 ? (
          <div className="text-center">No Categories Available</div>
        ) : (
          shopCategories.map((category, idx) => (
            <SwiperSlide key={idx} className="bg-[#F3F3F3] h-[360px] relative group">
              <Image
                src={category.image}
                alt={category.name || "Shop Category"}
                width={200}
                height={200}
                className="w-full h-[360px]"
              />
              <div className=" hidden group-hover:block">
                <Link href={'/'} className=" text-center absolute bottom-5 w-10/12 mx-auto inset-x-0 py-[14px] px-[20px] bg-white text-black font-jost font-normal text-base rounded-md">Casual Wear</Link>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}
