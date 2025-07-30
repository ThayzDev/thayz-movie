import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useSearch(
  searchQuery: string,
  searchCategory: string,
  contentType: "movie" | "tv",
  setSearchParams: (params: URLSearchParams) => void,
  urlQuery: string,
  urlType: string | null
) {
  const location = useLocation();

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

  return { location };
}
