"use client";
import PageBanner from "@/app/components/Banner";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import ShowMoreButton from "@/app/components/ShowMoreButton/ShowMoreButton";
import StatusMessage from "@/app/components/StatusMessage";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import MediaResult from "./components/MediaResult";
import { useMediaData } from "./hooks/useMediaData";
import { useMediaEffects } from "./hooks/useMediaEffects";
import { useMediaHandlers } from "./hooks/useMediaHandlers";
import { useMediaPage } from "./hooks/useMediaPage";
import { useSearch } from "./hooks/useSearch";

interface MediaPageProps {
  type: "movies" | "tv-series";
}

const MediaPage: React.FC<MediaPageProps> = ({ type }) => {
  const location = useLocation();
  const { t } = useTranslation();
  // Hooks
  const {
    inputValue,
    setInputValue,
    searchQuery,
    setSearchQuery,
    forceSearch,
    setForceSearch,
    handleInputChange,
    handleSearch: baseHandleSearch,
  } = useSearch("");
  const {
    movies,
    setMovies,
    tvSeries,
    setTVSeries,
    loadingMovies,
    loadingTV,
    loadMovies,
    loadTVSeries,
  } = useMediaData(type);
  const {
    currentPageMovies,
    setCurrentPageMovies,
    currentPageTV,
    setCurrentPageTV,
    displayCount,
    setDisplayCount,
    resetPages,
  } = useMediaPage();

  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const {
    handleSearch,
    handleLoadMoreMovies,
    handleLoadMoreTV,
    handleCardClick,
  } = useMediaHandlers({
    type,
    setDisplayCount,
    setSearchQuery,
    setForceSearch,
    resetPages,
    setMovies,
    setTVSeries,
    setCurrentPageMovies,
    setCurrentPageTV,
    movies,
    tvSeries,
    displayCount,
    setShowMoreLoading,
  });

  const loadMoviesWithLoadMore = loadMovies;
  const loadTVSeriesWithLoadMore = loadTVSeries;

  useMediaEffects({
    type,
    loadMovies: loadMoviesWithLoadMore,
    loadTVSeries: loadTVSeriesWithLoadMore,
    currentPageMovies,
    currentPageTV,
    searchQuery,
    forceSearch,
    location,
    setSearchQuery,
    setInputValue,
    setDisplayCount,
    resetPages,
    setMovies,
    setTVSeries,
  });

  const isLoading = type === "movies" ? loadingMovies : loadingTV;
  const items = type === "movies" ? movies : tvSeries;
  const notFound = !isLoading && !!searchQuery && items.length === 0;

  return (
    <div className="bg-[#0f0f0f] min-h-screen flex flex-col pb-10">
      <PageBanner
        title={type === "movies" ? t("movies") : t("tvSeries")}
        type={type === "movies" ? "movie" : "tv"}
      />
      <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-15 ">
        <div className="movies-section mt-8">
          <div className="mb-10 flex justify-start">
            <SearchBar
              onSearch={handleSearch}
              category={type === "movies" ? "movie" : "tv"}
              onInputChange={handleInputChange}
              inputValue={inputValue}
            />
          </div>
          <StatusMessage
            loading={isLoading}
            notFound={notFound}
            notFoundText={t("status.notFound")}
          />

          {!isLoading && !notFound && (
            <>
              <MediaResult
                type={type}
                items={items}
                loading={
                  isLoading &&
                  !showMoreLoading &&
                  ((type === "movies" && currentPageMovies === 1) ||
                    (type === "tv-series" && currentPageTV === 1))
                }
                displayCount={displayCount}
                onCardClick={handleCardClick}
              />
              {(() => {
                const canShowMore =
                  displayCount < items.length || items.length % 20 === 0;
                return (
                  <ShowMoreButton
                    onLoadMore={
                      type === "movies"
                        ? handleLoadMoreMovies
                        : handleLoadMoreTV
                    }
                    isFetching={showMoreLoading}
                    canShowMore={canShowMore}
                  />
                );
              })()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
