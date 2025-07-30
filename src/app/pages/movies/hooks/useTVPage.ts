import { TVSeries } from "@/app/types/tvSeries";
import { useEffect, useState } from "react";
import { useMediaData } from "./useMediaData";

export function useTVPage({
  searchQuery,
  searchCategory,
  currentPage,
  setDisplayCount,
  contentType,
}: {
  searchQuery: string;
  searchCategory: string;
  currentPage: number;
  setDisplayCount: (count: number) => void;
  contentType: "movie" | "tv";
}) {
  const [allTVSeries, setAllTVSeries] = useState<TVSeries[]>([]);

  const { tvSeries, isLoadingTV, errorTV, isFetchingTV } = useMediaData(
    searchQuery,
    searchCategory,
    currentPage,
    contentType
  );

  useEffect(() => {
    if (currentPage === 1) {
      setAllTVSeries([]);
    }
  }, [searchQuery, searchCategory, contentType]);

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
    tvSeries,
    isLoadingTV,
    errorTV,
    isFetchingTV,
    allTVSeries,
    setAllTVSeries,
  };
}
