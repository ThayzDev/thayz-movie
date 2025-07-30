"use client";

import ShowMoreButton from "@/app/components/ShowMoreButton/ShowMoreButton";
import PageBanner from "../../components/Banner";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieResults from "./components/MovieResults";
import { useMediaPage } from "./hooks/useMediaPage";
import { useMovieHandlers } from "./hooks/useMovieHandlers";

const MediaPage = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchCategory,
    setSearchCategory,
    contentType,
    inputValue,
    setInputValue,
    currentPage,
    setCurrentPage,
    allMovies,
    allTVSeries,
    displayCount,
    setDisplayCount,
    movies,
    isLoadingMovies,
    errorMovies,
    isFetchingMovies,
    tvSeries,
    isLoadingTV,
    errorTV,
    isFetchingTV,
  } = useMediaPage();

  const { handleCardClick, handleSearch, handleInputChange, handleLoadMore } =
    useMovieHandlers(
      setSearchQuery,
      setSearchCategory,
      setInputValue,
      setCurrentPage,
      setDisplayCount,
      displayCount,
      contentType === "movie" ? allMovies : allTVSeries,
      contentType === "movie" ? movies : tvSeries,
      contentType
    );

  // Display the correct number of items based on displayCount
  const displayedItems =
    contentType === "movie"
      ? allMovies.slice(0, displayCount)
      : allTVSeries.slice(0, displayCount);

  const currentData = contentType === "movie" ? movies : tvSeries;
  const isLoading = contentType === "movie" ? isLoadingMovies : isLoadingTV;
  const error = contentType === "movie" ? errorMovies : errorTV;
  const isFetching = contentType === "movie" ? isFetchingMovies : isFetchingTV;

  // Ensure the "View More" button works by checking if there are more items
  const canShowMore = (() => {
    const allItems = contentType === "movie" ? allMovies : allTVSeries;

    // If there are more items to load, show the button
    if (displayCount < allItems.length) return true;

    // If current data has 20 items (meaning there could be more)
    if (currentData && currentData.length === 20 && !isLoading) return true;

    return false;
  })();

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <PageBanner
        title={contentType === "movie" ? "Movies" : "TV Series"}
        type={contentType === "movie" ? "movie" : "tv"}
      />

      <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-15 ">
        <div className="movies-section mt-8">
          <div className="mb-10 flex justify-start">
            <SearchBar
              onSearch={handleSearch}
              category={contentType === "movie" ? "movie" : "tv"}
              onInputChange={handleInputChange}
              inputValue={inputValue}
            />
          </div>
          <MovieResults
            isLoading={isLoading || isFetching} // Check loading or fetching
            error={error}
            items={displayedItems}
            handleCardClick={handleCardClick}
            contentType={contentType}
          />

          {/* Show "View More" button only if there's more data to load */}
          {canShowMore && (
            <ShowMoreButton
              onLoadMore={handleLoadMore}
              isFetching={isFetching}
              canShowMore={canShowMore}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaPage;
