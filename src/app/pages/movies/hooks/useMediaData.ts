import { fetchMovies, fetchTVSeries } from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";

export function useMediaData(
  searchQuery: string,
  searchCategory: string,
  currentPage: number,
  contentType: "movie" | "tv"
) {
  const {
    data: movies = [],
    isLoading: isLoadingMovies,
    error: errorMovies,
    isFetching: isFetchingMovies,
  } = useQuery({
    queryKey: ["movies", searchQuery, searchCategory, currentPage],
    queryFn: () => fetchMovies(searchCategory, searchQuery, currentPage),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: contentType === "movie",
    placeholderData: (previousData) => previousData,
    gcTime: 10 * 60 * 1000,
  });

  const {
    data: tvSeries = [],
    isLoading: isLoadingTV,
    error: errorTV,
    isFetching: isFetchingTV,
  } = useQuery({
    queryKey: ["tvSeries", searchQuery, searchCategory, currentPage],
    queryFn: () => fetchTVSeries(searchCategory, searchQuery, currentPage),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: contentType === "tv",
    placeholderData: (previousData) => previousData,
    gcTime: 10 * 60 * 1000,
  });

  return {
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
