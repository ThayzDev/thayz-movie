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

  return {
    data,
    isLoading,
    error,
    type,
    handleSimilarClick,
  };
};
