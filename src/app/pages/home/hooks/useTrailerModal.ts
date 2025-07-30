import { useState } from "react";

export function useTrailerModal() {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerMovieId, setTrailerMovieId] = useState<number>(0);
  const [trailerType, setTrailerType] = useState<"movie" | "tv">("movie");

  const handleOpenTrailer = (movieId: number, type: "movie" | "tv") => {
    setTrailerMovieId(movieId);
    setTrailerType(type);
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  return {
    showTrailer,
    trailerMovieId,
    trailerType,
    handleOpenTrailer,
    handleCloseTrailer,
  };
}
