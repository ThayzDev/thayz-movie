"use client";
import { getImageUrl } from "@/app/utils/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface BannerPosterProps {
  poster_path: string;
  title: string;
  onAnimationComplete: () => void;
  animatePoster?: boolean;
  className?: string;
  isInitialLoad?: boolean;
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
      setIsLoaded(false);
      const timer = setTimeout(() => {
        setIsLoaded(true);
        onAnimationComplete();
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
      onAnimationComplete();
    }
  }, [poster_path, onAnimationComplete, isInitialLoad]);

  return (
    <div className="w-full flex justify-center items-center h-full transform-gpu mr-120 mt-4">
      <div className="relative">
        {poster_path ? (
          <Image
            className={`rounded-2xl lg:rounded-3xl xl:rounded-4xl shadow-lg object-cover ${
              isInitialLoad
                ? `transform transition-all duration-500 ease-in-out ${
                    isLoaded ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  }`
                : "opacity-100"
            }`}
            src={getImageUrl(poster_path)}
            alt={title}
            width={380}
            height={560}
            style={{
              width: "380px",
              height: "560px",
              maxWidth: "100%",
              maxHeight: "90vh",
            }}
            priority
            onLoad={() => setIsLoaded(true)}
          />
        ) : (
          <div
            className={`bg-gray-600 rounded-2xl lg:rounded-3xl xl:rounded-4xl flex items-center justify-center ${
              isInitialLoad
                ? `transform transition-all duration-1200 ease-out ${
                    isLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  }`
                : "opacity-100"
            }`}
            style={{
              width: "600px",
              height: "900px",
              maxWidth: "100%",
              maxHeight: "90vh",
            }}
          >
            <span className="text-gray-300 text-sm">No Image</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerPoster;
