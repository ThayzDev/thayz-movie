import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface UseMediaEffectsParams {
  type: "movies" | "tv-series";
  loadMovies: (page: number, keyword?: string, isLoadMore?: boolean) => void;
  loadTVSeries: (page: number, keyword?: string, isLoadMore?: boolean) => void;
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
  const { i18n } = useTranslation();
  const language = i18n.language;

  // Refetch movies when language changes
  useEffect(() => {
    if (type === "movies") {
      setMovies([]);
      setDisplayCount(20);
      resetPages();
      loadMovies(1, searchQuery);
    }
  }, [language, type]);

  // Refetch TV series when language changes
  useEffect(() => {
    if (type === "tv-series") {
      setTVSeries([]);
      setDisplayCount(20);
      resetPages();
      loadTVSeries(1, searchQuery);
    }
  }, [language, type]);

  // Khi chuyển trang (load more), truyền isLoadMore=true để không set loading
  useEffect(() => {
    if (type === "movies") {
      const isLoadMore = currentPageMovies > 1;
      loadMovies(currentPageMovies, searchQuery, isLoadMore);
    }
  }, [currentPageMovies, type, searchQuery, forceSearch]);

  useEffect(() => {
    if (type === "tv-series") {
      const isLoadMore = currentPageTV > 1;
      loadTVSeries(currentPageTV, searchQuery, isLoadMore);
    }
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
