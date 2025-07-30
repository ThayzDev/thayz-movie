import { Movie } from "@/app/types/movie";
import { TVSeries } from "@/app/types/tvSeries";
import { fetchMovies, fetchTVSeries } from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export function useHomeData(searchQuery: string) {
  const { i18n } = useTranslation();
  const language =
    i18n.language === "vi"
      ? "vi-VN"
      : i18n.language === "th"
      ? "th-TH"
      : "en-US";

  const {
    data: trendingMovies = [],
    isLoading: isLoadingMovies,
    error: errorMovies,
  } = useQuery<Movie[], Error>({
    queryKey: ["movies", "trending", searchQuery, language],
    queryFn: () => fetchMovies("trending", searchQuery, 1, language),
  });

  const {
    data: topRatedMovies = [],
    isLoading: isLoadingTopRatedMovies,
    error: errorTopRatedMovies,
  } = useQuery<Movie[], Error>({
    queryKey: ["movies", "topRated", searchQuery, language],
    queryFn: () => fetchMovies("top_rated", searchQuery, 1, language),
  });

  const {
    data: trendingTV = [],
    isLoading: isLoadingTrendingTV,
    error: errorTrendingTV,
  } = useQuery<TVSeries[], Error>({
    queryKey: ["tvSeries", "trending", searchQuery, language],
    queryFn: () => fetchTVSeries("trending", searchQuery, 1, language),
  });

  const {
    data: topRatedTV = [],
    isLoading: isLoadingTopRatedTV,
    error: errorTopRatedTV,
  } = useQuery<TVSeries[], Error>({
    queryKey: ["tvSeries", "topRated", searchQuery, language],
    queryFn: () => fetchTVSeries("top_rated", searchQuery, 1, language),
  });

  return {
    trendingMovies,
    isLoadingMovies,
    errorMovies,
    topRatedMovies,
    isLoadingTopRatedMovies,
    errorTopRatedMovies,
    trendingTV,
    isLoadingTrendingTV,
    errorTrendingTV,
    topRatedTV,
    isLoadingTopRatedTV,
    errorTopRatedTV,
  };
}
