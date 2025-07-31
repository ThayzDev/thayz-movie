import { useHomeData } from "./useHomeData";
import { useHomeSliderHandlers } from "./useHomeSliderHandlers";
import { useTrailerModal } from "./useTrailerModal";

export function useHomePage() {
  const {
    showTrailer,
    trailerMovieId,
    trailerType,
    handleOpenTrailer,
    handleCloseTrailer,
  } = useTrailerModal();

  const {
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
  } = useHomeData("");

  const { handleCardClick } = useHomeSliderHandlers();

  return {
    showTrailer,
    trailerMovieId,
    trailerType,
    handleOpenTrailer,
    handleCloseTrailer,
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
    handleCardClick,
  };
}
