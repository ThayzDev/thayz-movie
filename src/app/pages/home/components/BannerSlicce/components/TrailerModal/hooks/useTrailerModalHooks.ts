import { fetchMovieDetail, fetchTVDetail } from "@/app/utils/api";
import { useEffect, useState } from "react";

export function useTrailerKey(movieId: number, type: "movie" | "tv") {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        let detail;
        if (type === "movie") {
          detail = await fetchMovieDetail(String(movieId));
        } else {
          detail = await fetchTVDetail(String(movieId));
        }
        const trailer = detail.videos?.results?.find(
          (vid: any) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer?.key || null);
      } catch {
        setTrailerKey(null);
      }
    };
    fetchTrailer();
  }, [movieId, type]);

  return trailerKey;
}

export function useEscClose(onClose: () => void) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);
}
