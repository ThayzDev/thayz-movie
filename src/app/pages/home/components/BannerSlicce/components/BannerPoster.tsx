"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface BannerPosterProps {
  poster_path: string;
  title: string;
  onAnimationComplete: () => void;
  animatePoster?: boolean;
  className?: string;
  isInitialLoad?: boolean; // Thêm prop để biết có phải lần đầu load không
}

const BannerPoster: React.FC<BannerPosterProps> = ({
  poster_path,
  title,
  onAnimationComplete,
  isInitialLoad = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isInitialLoad) {
      // Chỉ animation nếu là lần đầu load
      setIsLoaded(false);
      const timer = setTimeout(() => {
        setIsLoaded(true);
        onAnimationComplete();
      }, 200);
      return () => clearTimeout(timer);
    } else {
      // Không animation, hiển thị ngay lập tức
      setIsLoaded(true);
      onAnimationComplete();
    }
  }, [poster_path, onAnimationComplete, isInitialLoad]);

  return (
    <div className="w-full flex justify-center items-center h-full transform-gpu">
      <div className="relative">
        {poster_path ? (
          <Image
            className={`rounded-2xl lg:rounded-3xl xl:rounded-4xl shadow-lg w-56 h-84 lg:w-64 lg:h-96 xl:w-72 xl:h-108 2xl:w-100 2xl:h-140 object-cover ${
              isInitialLoad
                ? `transform transition-all duration-1200 ease-out ${
                    isLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  }`
                : "opacity-100"
            }`}
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width={320}
            height={480}
            priority
            onLoad={() => setIsLoaded(true)}
          />
        ) : (
          <div
            className={`w-56 h-84 lg:w-64 lg:h-96 xl:w-72 xl:h-108 2xl:w-80 2xl:h-120 bg-gray-600 rounded-2xl lg:rounded-3xl xl:rounded-4xl flex items-center justify-center ${
              isInitialLoad
                ? `transform transition-all duration-1200 ease-out ${
                    isLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  }`
                : "opacity-100"
            }`}
          >
            <span className="text-gray-300 text-sm">No Image</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerPoster;
