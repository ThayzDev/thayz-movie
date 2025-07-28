"use client";

import StatusMessage from "@/app/components/StatusMessage";
import BannerSlice from "@/app/pages/home/components/BannerSlicce/bannerSlice";
import TrailerModal from "@/app/pages/home/components/BannerSlicce/components/TrailerModal/TrailerModal";
import { useState } from "react";
import {
  TopRatedMoviesSection,
  TopRatedTVSection,
  TrendingMoviesSection,
  TrendingTVSection,
} from "./components/HomeSections";
import { useHomeData } from "./hooks/useHomeData";
import { useHomeSliderHandlers } from "./hooks/useHomeSliderHandlers";

const HomePage = () => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerMovieId, setTrailerMovieId] = useState<number>(0);
  const [trailerType, setTrailerType] = useState<"movie" | "tv">("movie");

  const {
    trendingMovies,
    isLoadingMovies,
    errorMovies,
    topRatedMovies,
    isLoadingTopRatedMovies,
    errorTopRatedMovies,
    trendingTV,
    isLoadingTrendingTV,
    errorTrendingTV,
    topRatedTV,
    isLoadingTopRatedTV,
    errorTopRatedTV,
  } = useHomeData("");

  const handleOpenTrailer = (movieId: number, type: "movie" | "tv") => {
    setTrailerMovieId(movieId);
    setTrailerType(type);
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  const getSliceLimit = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width >= 1024) return 15;
      if (width >= 768) return 12;
      return 8;
    }
    return 15;
  };

  const sliceLimit = getSliceLimit();

  const { handleCardClick } = useHomeSliderHandlers();

  if (
    isLoadingMovies ||
    isLoadingTopRatedMovies ||
    isLoadingTrendingTV ||
    isLoadingTopRatedTV
  ) {
    return <StatusMessage loading />;
  }

  if (
    errorMovies ||
    errorTopRatedMovies ||
    errorTrendingTV ||
    errorTopRatedTV
  ) {
    const error =
      errorMovies || errorTopRatedMovies || errorTrendingTV || errorTopRatedTV;
    return <StatusMessage error={error} />;
  }

  return (
    <div className="min-h-screen">
      <div className="overflow-x-hidden">
        <BannerSlice
          movies={trendingMovies.slice(0, 7)}
          onOpenTrailer={handleOpenTrailer}
        />

        <div className="w-full space-y-12 pb-16 mt-8 sm:mt-12 lg:mt-10 px-2 sm:px-4 md:px-6 lg:px-10">
          <TrendingMoviesSection
            movies={trendingMovies}
            sliceLimit={sliceLimit}
            onCardClick={handleCardClick}
          />
          <TopRatedMoviesSection
            movies={topRatedMovies}
            sliceLimit={sliceLimit}
            onCardClick={handleCardClick}
            sliderSettings={{}}
          />
          <TrendingTVSection
            tvSeries={trendingTV}
            sliceLimit={sliceLimit}
            onCardClick={handleCardClick}
            sliderSettings={{}}
          />
          <TopRatedTVSection
            tvSeries={topRatedTV}
            sliceLimit={sliceLimit}
            onCardClick={handleCardClick}
            sliderSettings={{}}
          />
        </div>
      </div>

      {showTrailer && (
        <TrailerModal
          movieId={trailerMovieId}
          type={trailerType}
          onClose={handleCloseTrailer}
        />
      )}
    </div>
  );
};

export default HomePage;
