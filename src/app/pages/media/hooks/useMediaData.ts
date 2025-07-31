import { Movie } from "@/app/types/movie";
import { TVSeries } from "@/app/types/tvSeries";
import { fetchMovies, fetchTVSeries } from "@/app/utils/api";

import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export function useMediaData(type: "movies" | "tv-series") {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvSeries, setTVSeries] = useState<TVSeries[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [loadingTV, setLoadingTV] = useState(false);
  const { i18n } = useTranslation();
  const language =
    i18n.language === "vi"
      ? "vi-VN"
      : i18n.language === "th"
      ? "th-TH"
      : "en-US";

  const loadMovies = useCallback(
    async (page: number, keyword?: string, isLoadMore: boolean = false) => {
      if (!isLoadMore) setLoadingMovies(true);
      try {
        const category = keyword ? "search" : "popular";
        const newMovies = await fetchMovies(
          category,
          keyword || "",
          page,
          language
        );
        setMovies((prevMovies) => {
          if (page === 1) return newMovies;

          const prevIds = new Set(prevMovies.map((m: Movie) => m.id));
          const filtered = newMovies.filter((m: Movie) => !prevIds.has(m.id));
          return [...prevMovies, ...filtered];
        });
      } catch (error) {
        console.error("Error loading movies:", error);
      } finally {
        if (!isLoadMore) setLoadingMovies(false);
      }
    },
    [language]
  );

  const loadTVSeries = useCallback(
    async (page: number, keyword?: string, isLoadMore: boolean = false) => {
      if (!isLoadMore) setLoadingTV(true);
      try {
        const category = keyword ? "search" : "popular";
        const newTVSeries = await fetchTVSeries(
          category,
          keyword || "",
          page,
          language
        );
        setTVSeries((prevTVSeries) => {
          if (page === 1) return newTVSeries;
          const prevIds = new Set(prevTVSeries.map((m: TVSeries) => m.id));
          const filtered = newTVSeries.filter(
            (m: TVSeries) => !prevIds.has(m.id)
          );
          return [...prevTVSeries, ...filtered];
        });
      } catch (error) {
        console.error("Error loading TV series:", error);
      } finally {
        if (!isLoadMore) setLoadingTV(false);
      }
    },
    [language]
  );

  return {
    movies,
    setMovies,
    tvSeries,
    setTVSeries,
    loadingMovies,
    loadingTV,
    loadMovies,
    loadTVSeries,
  };
}
