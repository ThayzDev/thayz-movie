import { Movie } from "@/app/types/movie";
import { TVSeries } from "@/app/types/tvSeries";
import { fetchMovies, fetchTVSeries } from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";

export function useHomeData(searchQuery: string) {
  const {
    data: trendingMovies = [],
    isLoading: isLoadingMovies,
    error: errorMovies,
  } = useQuery<Movie[], Error>({
    queryKey: ["movies", "trending", searchQuery],
    queryFn: () => fetchMovies("trending", searchQuery),
  });

  const {
    data: topRatedMovies = [],
    isLoading: isLoadingTopRatedMovies,
    error: errorTopRatedMovies,
  } = useQuery<Movie[], Error>({
    queryKey: ["movies", "topRated", searchQuery],
    queryFn: () => fetchMovies("top_rated", searchQuery),
  });

  const {
    data: trendingTV = [],
    isLoading: isLoadingTrendingTV,
    error: errorTrendingTV,
  } = useQuery<TVSeries[], Error>({
    queryKey: ["tvSeries", "trending", searchQuery],
    queryFn: () => fetchTVSeries("trending", searchQuery),
  });

  const {
    data: topRatedTV = [],
    isLoading: isLoadingTopRatedTV,
    error: errorTopRatedTV,
  } = useQuery<TVSeries[], Error>({
    queryKey: ["tvSeries", "topRated", searchQuery],
    queryFn: () => fetchTVSeries("top_rated", searchQuery),
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
