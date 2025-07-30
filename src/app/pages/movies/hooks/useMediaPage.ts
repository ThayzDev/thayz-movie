import { Movie } from "@/app/types/movie";
import { TVSeries } from "@/app/types/tvSeries";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useMediaData } from "./useMediaData";
import { useSearch } from "./useSearch";

export function useMediaPage() {
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
  const [displayCount, setDisplayCount] = useState(20);
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
        setDisplayCount(20);
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

  useSearch(
    searchQuery,
    searchCategory,
    contentType,
    setSearchParams,
    urlQuery,
    urlType
  );

  const {
    movies,
    isLoadingMovies,
    errorMovies,
    isFetchingMovies,
    tvSeries,
    isLoadingTV,
    errorTV,
    isFetchingTV,
  } = useMediaData(searchQuery, searchCategory, currentPage, contentType);

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
        setDisplayCount(20);
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
        setDisplayCount(20);
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

  return {
    searchQuery,
    setSearchQuery,
    searchCategory,
    setSearchCategory,
    contentType,
    setContentType,
    inputValue,
    setInputValue,
    currentPage,
    setCurrentPage,
    allMovies,
    setAllMovies,
    allTVSeries,
    setAllTVSeries,
    displayCount,
    setDisplayCount,
    location,
    movies,
    isLoadingMovies,
    errorMovies,
    isFetchingMovies,
    tvSeries,
    isLoadingTV,
    errorTV,
    isFetchingTV,
  };
}
