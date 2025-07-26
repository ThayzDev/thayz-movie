"use client";
import { Movie } from "@/app/types/movie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerPoster from "./BannerPoster";
import TrailerModal from "./TrailerModal";

interface BannerSlideProps {
  movie: Movie;
  setIsTrailerOpen: (open: boolean) => void;
  isInitialLoad?: boolean; // Thêm prop để biết có phải lần đầu load không
  currentSlide?: number; // Thêm prop để theo dõi slide hiện tại
  slideIndex?: number; // Thêm prop để biết index của slide này
}

const BannerSlide: React.FC<BannerSlideProps> = ({
  movie,
  setIsTrailerOpen,
  isInitialLoad = false,
  currentSlide = 0,
  slideIndex = 0,
}) => {
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);
  const [posterDone, setPosterDone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset animation khi slide thay đổi
    setIsVisible(false);
    setPosterDone(false);

    // Delay để tạo hiệu ứng ẩn trước, sau đó animation xuống
    const hideTimer = setTimeout(() => {
      if (currentSlide === slideIndex) {
        // Chỉ animation nếu đây là slide active
        setIsVisible(true);
      }
    }, 200); // Tăng delay để rõ ràng hơn

    return () => clearTimeout(hideTimer);
  }, [currentSlide, slideIndex]); // Chạy lại khi currentSlide hoặc slideIndex thay đổi

  const handleWatchNow = () => {
    const type = movie.title ? "movie" : "tv";
    navigate(`/details/${type}/${movie.id}`);
  };

  const handleWatchTrailer = () => {
    setShowTrailer(true);
    setIsTrailerOpen(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
    setIsTrailerOpen(false);
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
            className={`text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-8xl font-extrabold text-white leading-tight transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }`}
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

      {showTrailer && (
        <TrailerModal
          movieId={movie.id}
          type={movie.title ? "movie" : "tv"}
          onClose={handleCloseTrailer}
        />
      )}
    </div>
  );
};

export default BannerSlide;
