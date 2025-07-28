"use client";
import { Movie } from "@/app/types/movie";
import React, { useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerSlide from "./components/Slice";

interface BannerProps {
  movies: Movie[];
  onOpenTrailer: (movieId: number, type: "movie" | "tv") => void;
}

const BannerSlice: React.FC<BannerProps> = ({ movies, onOpenTrailer }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

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
    // autoplay: { delay: 4000, disableOnInteraction: false },
    onSlideChange: (swiper: SwiperClass) => {
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
              onOpenTrailer={onOpenTrailer}
              isInitialLoad={currentSlide === 0 && index === 0}
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
