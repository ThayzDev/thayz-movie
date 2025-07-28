"use client";
import { Movie } from "@/app/types/movie";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useMovieHandlers(
  setSearchQuery: (q: string) => void,
  setSearchCategory: (c: string) => void,
  setInputValue: (v: string) => void,
  setCurrentPage: (page: number | ((prev: number) => number)) => void,
  setDisplayCount: (count: number) => void,
  displayCount: number,
  allMovies: Movie[],
  movies: Movie[] | undefined
) {
  const navigate = useNavigate();

  const handleCardClick = useCallback(
    (movie: Movie) => {
      navigate(`/details/movie/${movie.id}`);
    },
    [navigate]
  );

  const handleSearch = useCallback(
    (query: string, category: string) => {
      setSearchQuery(query);
      setSearchCategory(category);
      setCurrentPage(1);
      setDisplayCount(25);
    },
    [setSearchQuery, setSearchCategory, setCurrentPage, setDisplayCount]
  );

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
    },
    [setInputValue]
  );

  const handleLoadMore = useCallback(() => {
    const newDisplayCount = displayCount + 25;

    if (newDisplayCount > allMovies.length && movies && movies.length === 20) {
      setCurrentPage((prev) => prev + 1);
    }

    setDisplayCount(newDisplayCount);
  }, [displayCount, allMovies.length, movies, setCurrentPage, setDisplayCount]);

  return {
    handleCardClick,
    handleSearch,
    handleInputChange,
    handleLoadMore,
  };
}
