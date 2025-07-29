"use client";
import { Movie } from "@/app/types/movie";
import { TVSeries } from "@/app/types/tvSeries";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useMovieHandlers(
  setSearchQuery: (q: string) => void,
  setSearchCategory: (c: string) => void,
  setInputValue: (v: string) => void,
  setCurrentPage: (page: number | ((prev: number) => number)) => void,
  setDisplayCount: (count: number) => void,
  displayCount: number,
  allItems: (Movie | TVSeries)[],
  items: (Movie | TVSeries)[] | undefined,
  contentType: "movie" | "tv"
) {
  const navigate = useNavigate();

  const handleCardClick = useCallback(
    (item: Movie | TVSeries) => {
      if (contentType === "movie") {
        navigate(`/details/movie/${item.id}`);
      } else {
        navigate(`/details/tv/${item.id}`);
      }
    },
    [navigate, contentType]
  );

  const handleSearch = useCallback(
    (query: string, category: string) => {
      setSearchQuery(query);
      setSearchCategory(category);
      setCurrentPage(1);
      setDisplayCount(20);
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
    const newDisplayCount = displayCount + 20;

    if (newDisplayCount > allItems.length && items && items.length === 20) {
      setCurrentPage((prev) => prev + 1);
    }

    setDisplayCount(newDisplayCount);
  }, [displayCount, allItems.length, items, setCurrentPage, setDisplayCount]);

  return {
    handleCardClick,
    handleSearch,
    handleInputChange,
    handleLoadMore,
  };
}
