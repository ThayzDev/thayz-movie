"use client";
import StatusMessage from "@/app/components/StatusMessage";
import { Movie } from "@/app/types/movie";
import { TVSeries } from "@/app/types/tvSeries";
import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./DetailBanner.module.css";

interface DetailBannerProps {
  movie: Movie | TVSeries;
}

const DetailBanner: React.FC<DetailBannerProps> = ({ movie }) => {
  const [posterError, setPosterError] = React.useState(false);
  const [posterLoaded, setPosterLoaded] = React.useState(false);
  const [castError, setCastError] = React.useState<{ [id: number]: boolean }>(
    {}
  );
  const [castLoaded, setCastLoaded] = React.useState<{ [id: number]: boolean }>(
    {}
  );

  if (!movie) {
    return <StatusMessage notFound notFoundText="No movie available" />;
  }

  const isMovie = "title" in movie;

  return (
    <div className="w-full min-h-[500px] md:min-h-[800px] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden">
        <div
          className={`absolute inset-0 bg-center bg-no-repeat ${styles.detailBannerBg}`}
          style={{
            background: movie.backdrop_path
              ? `#0f0f0f url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) no-repeat center`
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to top,
              rgba(15,15,15,1) 0%,
              rgba(15,15,15,0.95) 8%,
              rgba(15,15,15,0.8) 15%,
              rgba(15,15,15,0.7) 25%,
              rgba(15,15,15,0.6) 35%,
              rgba(15,15,15,0.55) 45%,
              rgba(15,15,15,0.4) 55%,
              rgba(15,15,15,0.2) 70%,
              rgba(15,15,15,0.05) 85%,
              rgba(15,15,15,0) 100%
            )`,
            width: "100%",
            height: "100%",
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              ellipse at center bottom,
              rgba(15,15,15,0.4) 0%,
              rgba(15,15,15,0.2) 50%,
              transparent 80%
            )`,
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0f0f0f]"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start justify-start px-4 md:px-8 lg:px-6 pt-10 md:pt-30 text-white w-full h-full">
        <div className="w-full md:w-1/3 mt-6 lg:mt-5 hidden md:flex justify-center lg:justify-start mb-6 md:mb-0 md:mr-6 lg:mr-2 lg:ml-12">
          {movie.poster_path && !posterError ? (
            <div className="relative w-64 h-96 lg:w-97 lg:h-145">
              <Skeleton
                height="100%"
                width="100%"
                baseColor="#374151"
                highlightColor="#4B5563"
                borderRadius="1.5rem"
                className={`absolute inset-0 transition-opacity duration-500 ${
                  posterLoaded ? "opacity-0" : "opacity-100"
                }`}
              />
              <Image
                className={`rounded-3xl shadow-lg object-cover w-full h-full transition-all duration-500 ${
                  posterLoaded ? "opacity-100" : "opacity-0"
                }`}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={isMovie ? movie.title : movie.name}
                fill
                priority
                onError={() => setPosterError(true)}
                onLoad={() => setPosterLoaded(true)}
              />
            </div>
          ) : (
            <div className="w-64 h-96 lg:w-80 lg:h-120 bg-black rounded-md flex items-center justify-center">
              <div className="text-center">
                <span className="text-gray-300 text-xl">No poster image</span>
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:w-2/3  lg:w-full text-left md:mt-2 lg:mt-2 lg:ml-6">
          <h1 className="text-3xl md:text-5xl lg:text-[81px] font-extrabold text-white mb-5 leading-tight">
            {isMovie ? movie.title : movie.name}
          </h1>

          <div className="text-base md:text-lg lg:text-xl text-gray-200 mb-8 opacity-90 leading-relaxed">
            {movie.genres.length > 0 ? (
              movie.genres.map((genre, index) => (
                <span
                  key={index}
                  className="inline-block bg-[#0f0f0f] text-white border-2 rounded-full px-4 py-[2px] mr-2 mb-2 lg:text-base md:text-sm text-sm"
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

          <div className="mb-8 w-full">
            <p
              className="text-sm md:text-base lg:text-lg text-white leading-normal"
              style={{ wordBreak: "break-word" }}
            >
              {movie.overview || "No description available"}
            </p>
          </div>

          <div className="mt-2">
            <h3 className="text-lg md:text-xl text-white font-semibold mb-2 md:mb-2">
              Casts
            </h3>
            <div className="flex flex-row flex-wrap gap-4 items-start">
              {movie.credits.cast?.slice(0, 5).map((actor) => (
                <div
                  key={actor.id}
                  className="w-[100px] h-[200px] flex flex-col items-center flex-shrink-0"
                >
                  {actor.profile_path && !castError[actor.id] ? (
                    <div className="relative w-[100px] h-[150px] mb-1">
                      <Skeleton
                        height="100%"
                        width="100%"
                        baseColor="#374151"
                        highlightColor="#4B5563"
                        borderRadius="1rem"
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          castLoaded[actor.id] ? "opacity-0" : "opacity-100"
                        }`}
                      />
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        fill
                        style={{
                          borderRadius: "1rem",
                          objectFit: "cover",
                        }}
                        className={`transition-all duration-500 ${
                          castLoaded[actor.id] ? "opacity-100" : "opacity-0"
                        }`}
                        onError={() =>
                          setCastError((prev) => ({
                            ...prev,
                            [actor.id]: true,
                          }))
                        }
                        onLoad={() =>
                          setCastLoaded((prev) => ({
                            ...prev,
                            [actor.id]: true,
                          }))
                        }
                      />
                    </div>
                  ) : (
                    <div className="w-[100px] h-[150px] bg-black rounded-lg flex items-center justify-center mb-1">
                      <div className="text-center">
                        <span className="text-gray-300 text-xs">No image</span>
                      </div>
                    </div>
                  )}
                  <p className="text-white text-xs md:text-sm mt-1 md:mt-2 break-words text-center w-full">
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
