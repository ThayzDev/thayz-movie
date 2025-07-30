import { useState } from "react";

export function useMediaPage() {
  const [currentPageMovies, setCurrentPageMovies] = useState(1);
  const [currentPageTV, setCurrentPageTV] = useState(1);
  const [displayCount, setDisplayCount] = useState(20);

  const resetPages = () => {
    setCurrentPageMovies(1);
    setCurrentPageTV(1);
    setDisplayCount(20);
  };

  return {
    currentPageMovies,
    setCurrentPageMovies,
    currentPageTV,
    setCurrentPageTV,
    displayCount,
    setDisplayCount,
    resetPages,
  };
}
