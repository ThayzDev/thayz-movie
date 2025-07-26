"use client";

import StatusMessage from "@/app/components/StatusMessage";
import BannerSlice from "@/app/pages/home/components/BannerSlicce/bannerSlice";
import {
  TopRatedMoviesSection,
  TopRatedTVSection,
  TrendingMoviesSection,
  TrendingTVSection,
} from "./components/HomeSections";
import { useHomeData } from "./hooks/useHomeData";
import { useHomeSliderHandlers } from "./hooks/useHomeSliderHandlers";

const HomePage = () => {
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
        <BannerSlice movies={trendingMovies.slice(0, 5)} />

        <div className="container mx-auto px-2 2xl:px-7 space-y-12 sm:space-y-16 pb-16 mt-8 sm:mt-12 lg:mt-10">
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
    </div>
  );
};

export default HomePage;
