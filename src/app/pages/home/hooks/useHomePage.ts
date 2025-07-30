import { useHomeData } from "./useHomeData";
import { useHomeSliderHandlers } from "./useHomeSliderHandlers";
import { useTrailerModal } from "./useTrailerModal";

export function useHomePage() {
  // State và handler cho trailer modal (tách riêng)
  const {
    showTrailer,
    trailerMovieId,
    trailerType,
    handleOpenTrailer,
    handleCloseTrailer,
  } = useTrailerModal();

  // Lấy dữ liệu phim/truyền hình
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

  // Handler cho slider/card
  const { handleCardClick } = useHomeSliderHandlers();

  // Tính toán số lượng item hiển thị theo kích thước màn hình
  const getSliceLimit = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width >= 1024) return 15;
      if (width >= 768) return 12;
      return 8;
    }
    return 15;
  };
  const sliceLimit = getSliceLimit();

  // Trả về tất cả cho UI
  return {
    showTrailer,
    trailerMovieId,
    trailerType,
    handleOpenTrailer,
    handleCloseTrailer,
    sliceLimit,
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
