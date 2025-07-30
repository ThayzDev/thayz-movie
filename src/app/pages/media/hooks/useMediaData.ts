import { Movie } from "@/app/types/movie";
import { TVSeries } from "@/app/types/tvSeries";
import { fetchMovies, fetchTVSeries } from "@/app/utils/api";
import { useCallback, useState } from "react";

export function useMediaData(type: "movies" | "tv-series") {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvSeries, setTVSeries] = useState<TVSeries[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [loadingTV, setLoadingTV] = useState(false);

  const loadMovies = useCallback(async (page: number, keyword?: string) => {
    setLoadingMovies(true);
    try {
      const category = keyword ? "search" : "popular";
      const newMovies = await fetchMovies(category, keyword || "", page);
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoadingMovies(false);
    }
  }, []);

  const loadTVSeries = useCallback(async (page: number, keyword?: string) => {
    setLoadingTV(true);
    try {
      const category = keyword ? "search" : "popular";
      const newTVSeries = await fetchTVSeries(category, keyword || "", page);
      setTVSeries((prevTVSeries) => [...prevTVSeries, ...newTVSeries]);
    } catch (error) {
      console.error("Error loading TV series:", error);
    } finally {
      setLoadingTV(false);
    }
  }, []);

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
