"use client";
import { Movie } from "@/app/types/movie";
import React, { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerSlide from "./components/Slice";

interface BannerProps {
  movies: Movie[];
}

const BannerSlice: React.FC<BannerProps> = ({ movies }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      if (isTrailerOpen) {
        // Không cần stop autoplay vì đã tắt
      } else {
        // Không cần start autoplay vì đã tắt
      }
    }
  }, [isTrailerOpen]);

  if (!movies || movies.length === 0) {
    return (
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] bg-gray-800 flex items-center justify-center">
        <p className="text-white text-sm sm:text-base">No movies available</p>
      </div>
    );
  }

  const settings = {
    slidesPerView: 1,
    loop: true,
    speed: 1000,
    // autoplay: { delay: 4000, disableOnInteraction: false }, // Tắt autoplay
    onSlideChange: (swiper: SwiperClass) => {
      setIsTrailerOpen(false);
      setCurrentSlide(swiper.realIndex);
    },
    breakpoints: {
      1024: { slidesPerView: 1, speed: 250 },
      768: { slidesPerView: 1, speed: 250 },
      640: { slidesPerView: 1, speed: 200 },
      480: { slidesPerView: 1, speed: 200 },
    },
    onSwiper: (swiper: SwiperClass) => {
      swiperRef.current = swiper;
    },
  };

  return (
    <div className="w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] 2xl:min-h-[800px] relative">
      <Swiper modules={[Autoplay]} {...settings}>
        {movies.map((movie, index) => (
          <SwiperSlide key={`${movie.id}-${currentSlide}`}>
            <BannerSlide
              movie={movie}
              setIsTrailerOpen={setIsTrailerOpen}
              isInitialLoad={currentSlide === 0 && index === 0} // Chỉ slide đầu tiên là initial load
              currentSlide={currentSlide}
              slideIndex={index}
              key={`slide-${movie.id}-${
                currentSlide === index ? "active" : "inactive"
              }`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlice;
