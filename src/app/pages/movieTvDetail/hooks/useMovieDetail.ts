"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieDetail, fetchTVDetail } from "../../../utils/api";

export function useMovieDetail() {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const language =
    i18n.language === "vi"
      ? "vi-VN"
      : i18n.language === "th"
      ? "th-TH"
      : "en-US";

  const { data, isLoading, error } = useQuery({
    queryKey: [type, id, language],
    queryFn: () => {
      if (type === "movie") {
        return fetchMovieDetail(id as string, language);
      } else if (type === "tv") {
        return fetchTVDetail(id as string, language);
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
}
