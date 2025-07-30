import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface UseMediaHandlersParams {
  type: "movies" | "tv-series";
  setDisplayCount: (v: number | ((prev: number) => number)) => void;
  setSearchQuery: (v: string) => void;
  setForceSearch: (v: (prev: number) => number) => void;
  resetPages: () => void;
  setMovies: (v: any[]) => void;
  setTVSeries: (v: any[]) => void;
  setCurrentPageMovies: (v: (prev: number) => number) => void;
  setCurrentPageTV: (v: (prev: number) => number) => void;
  movies: any[];
  tvSeries: any[];
  displayCount: number;
}

export function useMediaHandlers({
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
}: UseMediaHandlersParams) {
  const navigate = useNavigate();

  // Search handler with navigation and reset
  const handleSearch = useCallback(
    (query: string) => {
      setDisplayCount(20);
      const basePath = type === "movies" ? "/movies" : "/tv-series";
      if (!query.trim()) {
        setSearchQuery("");
        navigate(basePath);
      } else {
        setSearchQuery(query);
        navigate(`${basePath}?keyword=${encodeURIComponent(query)}`);
      }
      setForceSearch((prev: number) => prev + 1);
      resetPages();
      if (type === "movies") {
        setMovies([]);
      } else {
        setTVSeries([]);
      }
    },
    [
      type,
      setDisplayCount,
      setSearchQuery,
      setForceSearch,
      resetPages,
      setMovies,
      setTVSeries,
      navigate,
    ]
  );

  const handleLoadMoreMovies = useCallback(() => {
    if (displayCount >= movies.length) {
      setCurrentPageMovies((prevPage: number) => prevPage + 1);
    }
    setDisplayCount((prev: number) => prev + 20);
  }, [displayCount, movies.length, setCurrentPageMovies, setDisplayCount]);

  const handleLoadMoreTV = useCallback(() => {
    if (displayCount >= tvSeries.length) {
      setCurrentPageTV((prevPage: number) => prevPage + 1);
    }
    setDisplayCount((prev: number) => prev + 20);
  }, [displayCount, tvSeries.length, setCurrentPageTV, setDisplayCount]);

  const handleCardClick = useCallback(
    (item: any, itemType: "movie" | "tv") => {
      const id = item.id;
      navigate(`/details/${itemType}/${id}`);
    },
    [navigate]
  );

  return {
    handleSearch,
    handleLoadMoreMovies,
    handleLoadMoreTV,
    handleCardClick,
  };
}
