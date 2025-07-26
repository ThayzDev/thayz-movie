"use client";
import StatusMessage from "@/app/components/StatusMessage";
import { Movie } from "@/app/types/movie";
import { TVSeries } from "@/app/types/tvSeries";
import Image from "next/image";
import React from "react";

interface DetailBannerProps {
  movie: Movie | TVSeries;
}

const DetailBanner: React.FC<DetailBannerProps> = ({ movie }) => {
  if (!movie) {
    return <StatusMessage notFound notFoundText="No movie available" />;
  }

  const isMovie = "title" in movie;

  return (
    <div className="w-full min-h-[800px] relative overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: "inset(0 0 50% 0)" }}
      >
        <div
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            background: movie.backdrop_path
              ? `#0f0f0f url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) no-repeat center`
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundSize:
              window.innerWidth >= 576 && window.innerWidth <= 768
                ? "100% auto"
                : "cover",
            backgroundPosition: "center center",
            width: "100%",
            height: "100%",
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to top,
              rgba(15,15,15,1) 0%,
              rgba(15,15,15,1) 10%,
              rgba(15,15,15,1) 20%,
              rgba(15,15,15,1) 30%,
              rgba(15,15,15,1) 40%,
              rgba(15,15,15,1) 50%,
              rgba(15,15,15,0.85) 60%,
              rgba(15,15,15,0.45) 80%,
              rgba(15,15,15,0) 100%
            )`,
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start justify-start px-4 md:px-8 lg:px-6 pt-10 md:pt-30 text-white w-full h-full">
        <div className="w-full md:w-1/3 mt-6 lg:mt-5 hidden md:flex justify-center lg:justify-start mb-6 md:mb-0 md:mr-6 lg:mr-2 lg:ml-12">
          {movie.poster_path ? (
            <Image
              className="rounded-4xl shadow-lg object-cover w-64 h-96 lg:w-90 lg:h-130"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={isMovie ? movie.title : movie.name}
              width={400}
              height={600}
              priority
            />
          ) : (
            <div className="w-64 h-96 lg:w-80 lg:h-120 bg-gray-600 rounded-md flex items-center justify-center">
              <span className="text-gray-300">No Image</span>
            </div>
          )}
        </div>

        <div className="w-full md:w-2/3 lg:w-full text-left md:mt-8 lg:mt-2 lg:ml-7">
          <h1 className="text-3xl md:text-4xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            {isMovie ? movie.title : movie.name}
          </h1>

          <div className="text-base md:text-lg lg:text-xl text-gray-200 mb-8 max-w-3xl opacity-90 leading-relaxed">
            {movie.genres.length > 0 ? (
              movie.genres.map((genre, index) => (
                <span
                  key={index}
                  className="inline-block bg-[#0f0f0f] text-white border-2 rounded-full px-4 py-1 mr-2 mb-2 text-sm"
                >
                  {genre.name}
                </span>
              ))
            ) : (
              <span className="inline-block bg-[#0f0f0f] text-white border-2 rounded-full px-4 py-2 text-sm">
                No genres available
              </span>
            )}
          </div>

          <p className="text-sm md:text-base lg:text-lg text-white mb-8 max-w-3xl leading-relaxed">
            {movie.overview || "No description available"}
          </p>

          <div className="mt-2">
            <h3 className="text-lg md:text-xl text-white font-semibold mb-2 md:mb-4">
              Casts
            </h3>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {movie.credits.cast?.slice(0, 5).map((actor) => (
                <div key={actor.id} className="w-24 md:w-28 mb-2 md:mb-4">
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-32 md:h-37 mb-1 object-cover rounded-2xl"
                    width={112}
                    height={148}
                  />
                  <p className="text-white text-xs md:text-sm mt-1 md:mt-2 break-words text-left">
                    {actor.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBanner;
