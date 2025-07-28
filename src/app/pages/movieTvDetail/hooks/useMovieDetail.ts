"use client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieDetail, fetchTVDetail } from "../../../utils/api";

export const useMovieDetail = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: [type, id],
    queryFn: () => {
      if (type === "movie") {
        return fetchMovieDetail(id as string);
      } else if (type === "tv") {
        return fetchTVDetail(id as string);
      }
      return null;
    },
    enabled: !!id && !!type,
  });

  const handleSimilarClick = (item: any) => {
    navigate(`/details/${type}/${item.id}`);
  };

  const handleTrailerPlay = (videoKey: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoKey}`, "_blank");
  };

  const handleTrailerFullscreen = (videoKey: string) => {
    console.log(`Playing fullscreen trailer: ${videoKey}`);
  };

  const handleCastClick = (castId: number, castName: string) => {
    console.log(`Navigate to cast: ${castName} (ID: ${castId})`);
  };

  const handleGenreClick = (genreId: number, genreName: string) => {
    console.log(`Navigate to genre: ${genreName} (ID: ${genreId})`);
  };

  const handlePosterClick = () => {
    console.log("Open poster in modal");
  };

  const handleBackdropClick = () => {
    console.log("Open backdrop in modal");
  };

  return {
    data,
    isLoading,
    error,
    type,
    handleSimilarClick,
    handleTrailerPlay,
    handleTrailerFullscreen,
    handleCastClick,
    handleGenreClick,
    handlePosterClick,
    handleBackdropClick,
  };
};
