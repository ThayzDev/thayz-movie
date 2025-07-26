"use client";
import Image from "next/image";
import { useRef } from "react";

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
  const mouseDownX = useRef<number | null>(null);
  const mouseDownY = useRef<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseDownX.current = e.clientX;
    mouseDownY.current = e.clientY;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (
      mouseDownX.current !== null &&
      mouseDownY.current !== null &&
      Math.abs(e.clientX - mouseDownX.current) < 5 &&
      Math.abs(e.clientY - mouseDownY.current) < 5
    ) {
      onCardClick && onCardClick();
    }
    mouseDownX.current = null;
    mouseDownY.current = null;
  };

  return (
    <div
      className="px-2"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="group cursor-pointer">
        <div className="aspect-[2/3] overflow-hidden rounded-3xl mb-3 shadow-lg relative w-full max-w-xs h-80">
          <Image
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={isMovie ? (item as Movie).title : (item as TVSeries).name}
            fill
            className="object-cover  transition-transform duration-500"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ borderRadius: "1.5rem" }}
          />

          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-3 bg-red-600 hover:bg-red-600 rounded-3xl z-10 text-white text-lg font-bold scale-50 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 shadow-[0_0_6px_7px_rgba(255,0,0,0.4)] hover:shadow-[0_0_10px_12px_rgba(255,0,0,0.5)] hover:scale-110">
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
