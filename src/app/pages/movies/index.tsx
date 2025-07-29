"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import PageBanner from "../../components/Banner";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Movie } from "../../types/movie";
import { TVSeries } from "../../types/tvSeries";
import { fetchMovies, fetchTVSeries } from "../../utils/api";

import ShowMoreButton from "@/app/components/ShowMoreButton/ShowMoreButton";
import MovieResults from "./components/MovieResults";
import { useMovieHandlers } from "./hooks/useMovieHandlers";

const MediaPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlQuery = searchParams.get("keyword") || "";
  const urlType = searchParams.get("type");
  const urlCategory = searchParams.get("category") || "movie";

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [searchCategory, setSearchCategory] = useState(
    urlQuery ? "search" : urlType ? urlType : "trending"
  );
  const [contentType, setContentType] = useState<"movie" | "tv">(
    urlCategory === "tv" ? "tv" : "movie"
  );
  const [inputValue, setInputValue] = useState(urlQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [allTVSeries, setAllTVSeries] = useState<TVSeries[]>([]);
  const [displayCount, setDisplayCount] = useState(25);
  const location = useLocation();

  useEffect(() => {
    const path = window.location.pathname;
    const newContentType = path.includes("/tv-series") ? "tv" : "movie";

    if (newContentType !== contentType) {
      setContentType(newContentType);

      if (!urlQuery && !urlType) {
        setSearchQuery("");
        setSearchCategory("trending");
        setInputValue("");
        setCurrentPage(1);
        setDisplayCount(25);
        setAllMovies([]);
        setAllTVSeries([]);
      }
    }
  }, []);

  useEffect(() => {
    const path = location.pathname;
    const newContentType = path.includes("/tv-series") ? "tv" : "movie";
    if (newContentType !== contentType) {
      setContentType(newContentType);
    }
  }, [location.pathname]);
  useEffect(() => {
    const isCleanNavigation = !urlQuery && !urlType;

    if (isCleanNavigation && searchCategory === "trending") {
      return;
    }

    const params = new URLSearchParams();

    if (searchQuery && searchQuery.trim()) {
      params.set("keyword", searchQuery);
      setSearchParams(params);
      return;
    }

    if (searchCategory === "top_rated") {
      params.set("type", "top_rated");
      setSearchParams(params);
      return;
    }

    if (searchCategory && searchCategory !== "trending") {
      params.set("type", searchCategory);
      setSearchParams(params);
      return;
    }

    if (searchCategory === "trending" && urlType === "trending") {
      params.set("type", "trending");
      setSearchParams(params);
    }
  }, [
    searchQuery,
    searchCategory,
    contentType,
    setSearchParams,
    urlQuery,
    urlType,
  ]);

  const {
    data: movies = [],
    isLoading: isLoadingMovies,
    error: errorMovies,
    isFetching: isFetchingMovies,
  } = useQuery({
    queryKey: ["movies", searchQuery, searchCategory, currentPage],
    queryFn: () => fetchMovies(searchCategory, searchQuery, currentPage),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: contentType === "movie",
    placeholderData: (previousData) => previousData,
    gcTime: 10 * 60 * 1000,
  });

  const {
    data: tvSeries = [],
    isLoading: isLoadingTV,
    error: errorTV,
    isFetching: isFetchingTV,
  } = useQuery({
    queryKey: ["tvSeries", searchQuery, searchCategory, currentPage],
    queryFn: () => fetchTVSeries(searchCategory, searchQuery, currentPage),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: contentType === "tv",
    placeholderData: (previousData) => previousData,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (currentPage === 1) {
      setAllMovies([]);
      setAllTVSeries([]);
    }
  }, [searchQuery, searchCategory, contentType]);

  useEffect(() => {
    if (movies !== undefined && contentType === "movie") {
      if (currentPage === 1) {
        setAllMovies(movies);
        setDisplayCount(25);
      } else if (movies.length > 0) {
        setAllMovies((prev) => {
          const existingIds = new Set(prev.map((movie: Movie) => movie.id));
          const newMovies = movies.filter(
            (movie: Movie) => !existingIds.has(movie.id)
          );
          return [...prev, ...newMovies];
        });
      }
    }
  }, [movies, currentPage, contentType]);

  useEffect(() => {
    if (tvSeries !== undefined && contentType === "tv") {
      if (currentPage === 1) {
        setAllTVSeries(tvSeries);
        setDisplayCount(25);
      } else if (tvSeries.length > 0) {
        setAllTVSeries((prev) => {
          const existingIds = new Set(prev.map((tv: TVSeries) => tv.id));
          const newTVSeries = tvSeries.filter(
            (tv: TVSeries) => !existingIds.has(tv.id)
          );
          return [...prev, ...newTVSeries];
        });
      }
    }
  }, [tvSeries, currentPage, contentType]);

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

  const displayedItems =
    contentType === "movie"
      ? allMovies.slice(0, displayCount)
      : allTVSeries.slice(0, displayCount);

  const currentData = contentType === "movie" ? movies : tvSeries;
  const isLoading = contentType === "movie" ? isLoadingMovies : isLoadingTV;
  const error = contentType === "movie" ? errorMovies : errorTV;
  const isFetching = contentType === "movie" ? isFetchingMovies : isFetchingTV;

  const canShowMore =
    displayCount <
      (contentType === "movie" ? allMovies.length : allTVSeries.length) ||
    (currentData && currentData.length >= 20 && !isLoading);

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
            isLoading={
              (isLoading && displayedItems.length === 0) ||
              (isFetching && displayedItems.length === 0)
            }
            error={error}
            items={displayedItems}
            handleCardClick={handleCardClick}
            contentType={contentType}
          />

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
