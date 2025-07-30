"use client";
import PageBanner from "@/app/components/Banner";
import SearchBar from "@/app/components/SearchBar/SearchBar";
import ShowMoreButton from "@/app/components/ShowMoreButton/ShowMoreButton";
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

  // Custom handlers
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
  });

  // Effects
  useMediaEffects({
    type,
    loadMovies,
    loadTVSeries,
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

  return (
    <div className="bg-[#0f0f0f] min-h-screen flex flex-col pb-10">
      <PageBanner
        title={type === "movies" ? "Movies" : "TV Series"}
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
          <>
            <MediaResult
              type={type}
              items={type === "movies" ? movies : tvSeries}
              loading={type === "movies" ? loadingMovies : loadingTV}
              displayCount={displayCount}
              onCardClick={handleCardClick}
            />
            {(() => {
              const isLoading = type === "movies" ? loadingMovies : loadingTV;
              const items = type === "movies" ? movies : tvSeries;
              const canShowMore =
                isLoading ||
                displayCount < items.length ||
                items.length % 20 === 0;
              return (
                <ShowMoreButton
                  onLoadMore={
                    type === "movies" ? handleLoadMoreMovies : handleLoadMoreTV
                  }
                  isFetching={isLoading}
                  canShowMore={canShowMore}
                />
              );
            })()}
          </>
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
