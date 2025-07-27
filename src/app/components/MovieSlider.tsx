"use client";
import MovieCard from "@/app/components/MovieCard";
import { Movie } from "@/app/types/movie";
import { TVSeries } from "@/app/types/tvSeries";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface MovieSliderProps {
  items: (Movie | TVSeries)[];
  isMovie: boolean;
  onCardClick: (item: Movie | TVSeries) => void;
  sliceLimit?: number;
  settings?: any;
}

const defaultSettings = {
  slidesPerView: 2,
  spaceBetween: 0,
  loop: true,
  speed: 1000,
  autoplay: { delay: 3000, disableOnInteraction: false },
  breakpoints: {
    480: { slidesPerView: 2, spaceBetween: 0 },
    768: { slidesPerView: 4, spaceBetween: 0 },
    1024: { slidesPerView: 4, spaceBetween: 0 },
    1280: { slidesPerView: 6, spaceBetween: 0 },
    1536: { slidesPerView: 6, spaceBetween: 0 },
  },
};

const MovieSlider = ({
  items,
  isMovie,
  onCardClick,
  sliceLimit = 15,
  settings = {},
}: MovieSliderProps) => {
  const mergedSettings = { ...defaultSettings, ...settings };

  return (
    <Swiper modules={[Autoplay]} {...mergedSettings}>
      {items.slice(0, sliceLimit).map((item) => (
        <SwiperSlide key={item.id}>
          <MovieCard
            item={item}
            isMovie={isMovie}
            onCardClick={() => onCardClick && onCardClick(item)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MovieSlider;
