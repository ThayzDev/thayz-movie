"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageBanner from "../../components/Banner";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Movie } from "../../types/movie";
import { fetchMovies } from "../../utils/api";

import ShowMoreButton from "@/app/components/ShowMoreButton/ShowMoreButton";
import MovieResults from "./components/MovieResults";
import { useMovieHandlers } from "./hooks/useMovieHandlers";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlQuery = searchParams.get("keyword") || "";
  const urlType = searchParams.get("type");

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [searchCategory, setSearchCategory] = useState(
    urlQuery ? "search" : urlType ? urlType : "trending"
  );
  const [inputValue, setInputValue] = useState(urlQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [displayCount, setDisplayCount] = useState(25);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery && searchQuery.trim()) {
      params.set("keyword", searchQuery);
      setSearchParams(params);
      return;
    }

    if (searchCategory === "trending") {
      if (searchParams.get("type") === "trending") {
        return;
      } else {
        setSearchParams({});
        return;
      }
    }

    if (searchCategory === "top_rated") {
      params.set("type", "top_rated");
      setSearchParams(params);
      return;
    }
    if (searchCategory && searchCategory !== "trending") {
      params.set("type", searchCategory);
      setSearchParams(params);
    }
  }, [searchQuery, searchCategory, setSearchParams, searchParams]);

  const {
    data: movies = [],
    isLoading: isLoadingMovies,
    error: errorMovies,
    isFetching,
  } = useQuery({
    queryKey: ["movies", searchQuery, searchCategory, currentPage],
    queryFn: () => fetchMovies(searchCategory, searchQuery, currentPage),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: true,
    placeholderData: (previousData) => previousData,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (currentPage === 1) {
      setAllMovies([]);
    }
  }, [searchQuery, searchCategory]);

  useEffect(() => {
    if (movies !== undefined) {
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
  }, [movies, currentPage]);

  const { handleCardClick, handleSearch, handleInputChange, handleLoadMore } =
    useMovieHandlers(
      setSearchQuery,
      setSearchCategory,
      setInputValue,
      setCurrentPage,
      setDisplayCount,
      displayCount,
      allMovies,
      movies
    );

  const displayedMovies = allMovies.slice(0, displayCount);

  const canShowMore =
    displayCount < allMovies.length ||
    (movies && movies.length >= 20 && !isLoadingMovies);

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <PageBanner title="Movies" type="movie" />

      <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-15 ">
        <div className="movies-section mt-8">
          <div className="mb-10 flex justify-start">
            <SearchBar
              onSearch={handleSearch}
              category="movie"
              onInputChange={handleInputChange}
              inputValue={inputValue}
            />
          </div>
          <MovieResults
            isLoading={
              (isLoadingMovies && displayedMovies.length === 0) ||
              (isFetching && displayedMovies.length === 0)
            }
            error={errorMovies}
            movies={displayedMovies}
            handleCardClick={handleCardClick}
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

export default MoviesPage;
