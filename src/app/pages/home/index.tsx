"use client";

import StatusMessage from "@/app/components/StatusMessage";
import BannerSlice from "@/app/pages/home/components/BannerSlicce/bannerSlice";
import TrailerModal from "@/app/pages/home/components/BannerSlicce/components/TrailerModal/TrailerModal";
import {
  TopRatedMoviesSection,
  TopRatedTVSection,
  TrendingMoviesSection,
  TrendingTVSection,
} from "./components/HomeSections";
import { useHomePage } from "./hooks/useHomePage";

const HomePage = () => {
  const {
    showTrailer,
    trailerMovieId,
    trailerType,
    handleOpenTrailer,
    handleCloseTrailer,
    sliceLimit,
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
    handleCardClick,
  } = useHomePage();

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
