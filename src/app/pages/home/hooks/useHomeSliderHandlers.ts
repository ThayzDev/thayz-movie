import { Movie } from "@/app/types/movie";
import { TVSeries } from "@/app/types/tvSeries";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function useHomeSliderHandlers() {
  const isDragging = useRef(false);
  const navigate = useNavigate();

  const handleBeforeChange = () => {
    isDragging.current = true;
  };

  const handleAfterChange = () => {
    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  };

  const handleCardClick = (item: Movie | TVSeries) => {
    const isMovie = "title" in item;
    if (isDragging.current) return;
    const type = isMovie ? "movie" : "tv";
    navigate(`/details/${type}/${item.id}`);
  };

  return {
    isDragging,
    handleBeforeChange,
    handleAfterChange,
    handleCardClick,
  };
}
