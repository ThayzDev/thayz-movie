"use client";
import { Movie } from "@/app/types/movie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerPoster from "./BannerPoster";

interface BannerSlideProps {
  movie: Movie;
  onOpenTrailer: (movieId: number, type: "movie" | "tv") => void;
  isInitialLoad?: boolean;
  currentSlide?: number;
  slideIndex?: number;
}

const BannerSlide: React.FC<BannerSlideProps> = ({
  movie,
  onOpenTrailer,
  isInitialLoad = false,
  currentSlide = 0,
  slideIndex = 0,
}) => {
  const navigate = useNavigate();
  const [posterDone, setPosterDone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    setPosterDone(false);

    const hideTimer = setTimeout(() => {
      if (currentSlide === slideIndex) {
        setIsVisible(true);
      }
    }, 200);

    return () => clearTimeout(hideTimer);
  }, [currentSlide, slideIndex]);

  const handleWatchNow = () => {
    const type = movie.title ? "movie" : "tv";
    navigate(`/details/${type}/${movie.id}`);
  };

  const handleWatchTrailer = () => {
    const type = movie.title ? "movie" : "tv";
    onOpenTrailer(movie.id, type);
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-210 outline-none transform-gpu">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 "
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0f0f0f] opacity-130"></div>
      </div>
      <div className="relative h-full px-4 md:px-8 lg:px-12 py-8 md:py-16 lg:py-32 flex">
        <div className="w-full lg:w-full space-y-10 md:space-y-10 lg:space-y-10 text-left flex flex-col justify-center h-full pl-2 md:pl-8 lg:pl-12 xl:pl-8">
          <h1
            className={`text-4xl md:text-5xl lg:text-8xl xl:text-8xl 2xl:text-8xl font-extrabold text-white leading-none transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            } lg:max-w-[77%] xl:max-w-[80%] 2xl:max-w-[80%]`}
            style={{
              wordBreak: "break-word",
            }}
          >
            {movie.title}
          </h1>

          <p
            className={`text-xs md:text-sm lg:text-base xl:text-lg text-white font-medium max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl leading-relaxed transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            {movie.overview || "No overview available"}
          </p>

          <div
            className={`flex flex-row gap-1 md:gap-2 lg:gap-4 transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "0.6s" }}
          >
            <button
              className="bg-red-600 hover:bg-red-600 text-white px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2 md:py-3 lg:py-4 text-xs md:text-sm lg:text-base rounded-full transition-all duration-300 font-semibold shadow-[0_0_7px_8px_rgba(255,0,0,0.4)] hover:shadow-[0_0_12px_14px_rgba(255,0,0,0.5)] transform hover:scale-105 whitespace-nowrap"
              onClick={handleWatchNow}
            >
              Watch Now
            </button>
            <button
              className="bg-transparent hover:bg-white hover:text-red-600 text-white border-2 border-white px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2 md:py-3 lg:py-4 text-xs md:text-sm lg:text-base rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200 whitespace-nowrap"
              onClick={handleWatchTrailer}
            >
              Watch Trailer
            </button>
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/3 mr-20">
          <BannerPoster
            poster_path={movie.poster_path}
            title={movie.title}
            onAnimationComplete={() => setPosterDone(true)}
            isInitialLoad={isInitialLoad && currentSlide === slideIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerSlide;
