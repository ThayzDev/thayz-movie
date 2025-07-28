"use client";
import Image from "next/image";
import { useState } from "react";

import { Movie } from "@/app/types/movie";
import { TVSeries } from "@/app/types/tvSeries";

const MovieCard = ({
  item,
  isMovie = true,
  onCardClick,
}: {
  item: Movie | TVSeries;
  isMovie?: boolean;
  onCardClick?: () => void;
}) => {
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    onCardClick && onCardClick();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="px-2 cursor-pointer" onClick={handleCardClick}>
      <div className="group cursor-pointer">
        <div className="aspect-[2/3] overflow-hidden rounded-3xl mb-3 shadow-lg relative w-full max-w-xs h-80">
          {!imageError && item.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={isMovie ? (item as Movie).title : (item as TVSeries).name}
              fill
              className="object-cover transition-transform duration-500"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ borderRadius: "1.5rem" }}
              onError={handleImageError}
            />
          ) : (
            <div
              className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center text-gray-400"
              style={{ borderRadius: "1.5rem" }}
            >
              <div className="text-4xl mb-2">🎬</div>
              <div className="text-sm text-center px-2 font-medium">
                {isMovie ? (item as Movie).title : (item as TVSeries).name}
              </div>
              <div className="text-xs mt-1 opacity-60">No Image</div>
            </div>
          )}

          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <button
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-3 bg-red-600 hover:bg-red-600 rounded-3xl z-10 text-white text-lg font-bold scale-50 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 shadow-[0_0_6px_7px_rgba(255,0,0,0.4)] hover:shadow-[0_0_10px_12px_rgba(255,0,0,0.5)] hover:scale-110"
            tabIndex={-1}
            type="button"
            aria-label="Go to detail"
          >
            ▶
          </button>
        </div>

        <div className="text-left">
          <h3 className="text-white font-medium text-base line-clamp-2 group-hover:text-red-300 transition-colors duration-300 leading-tight">
            {isMovie ? (item as Movie).title : (item as TVSeries).name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
