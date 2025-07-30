import { useEffect } from "react";

interface UseMediaEffectsParams {
  type: "movies" | "tv-series";
  loadMovies: (page: number, keyword?: string) => void;
  loadTVSeries: (page: number, keyword?: string) => void;
  currentPageMovies: number;
  currentPageTV: number;
  searchQuery: string;
  forceSearch: number;
  location: { search: string };
  setSearchQuery: (v: string) => void;
  setInputValue: (v: string) => void;
  setDisplayCount: (v: number) => void;
  resetPages: () => void;
  setMovies: (v: any[]) => void;
  setTVSeries: (v: any[]) => void;
}

export function useMediaEffects({
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
}: UseMediaEffectsParams) {
  // Fetch data on page/keyword/type/forceSearch change
  useEffect(() => {
    if (type === "movies") {
      loadMovies(currentPageMovies, searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageMovies, type, searchQuery, forceSearch]);

  useEffect(() => {
    if (type === "tv-series") {
      loadTVSeries(currentPageTV, searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageTV, type, searchQuery, forceSearch]);

  // Sync keyword from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("keyword") || "";
    setSearchQuery(keyword);
    setInputValue(keyword);
    setDisplayCount(20);
    resetPages();
    if (type === "movies") {
      setMovies([]);
    } else if (type === "tv-series") {
      setTVSeries([]);
    }
  }, [type, location.search]);
}
