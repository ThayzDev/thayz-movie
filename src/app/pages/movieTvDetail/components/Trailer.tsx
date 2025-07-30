"use client";

import StatusMessage from "@/app/components/StatusMessage";
import {
  fetchMovieDetail,
  fetchTVDetail,
  getYoutubeEmbedUrl,
} from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const TrailerList: React.FC = () => {
  const { id, type } = useParams();
  const { i18n } = useTranslation();
  const language =
    i18n.language === "vi"
      ? "vi-VN"
      : i18n.language === "th"
      ? "th-TH"
      : "en-US";

  const {
    data: dataLang,
    isLoading,
    error,
  } = useQuery({
    queryKey: [type, id, language, "trailer"],
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

  const { data: dataEn } = useQuery({
    queryKey: [type, id, "en-US", "trailer"],
    queryFn: () => {
      if (type === "movie") {
        return fetchMovieDetail(id as string, "en-US");
      } else if (type === "tv") {
        return fetchTVDetail(id as string, "en-US");
      }
      return null;
    },
    enabled: !!id && !!type && language !== "en-US",
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return <StatusMessage loading loadingText="Loading trailers..." />;
  }

  if (error) {
    return <StatusMessage error={error} errorText="Error loading trailers" />;
  }

  let videos = dataLang?.videos?.results || [];
  if ((!videos || videos.length === 0) && dataEn?.videos?.results?.length) {
    videos = dataEn.videos.results;
  }

  const videoTypes = [
    "Trailer",
    "Teaser",
    "Clip",
    "Behind The Scenes",
    "Featurette",
    "Music Video",
  ];

  return (
    <div className="space-y-8 md:space-y-12 lg:space-y-16 bg-[#0f0f0f] px-4 md:px-8 lg:px-12 xl:px-20">
      {videoTypes.map((type) => {
        const video = videos.find((v: any) => v.type === type);

        if (!video) {
          return null;
        }

        return (
          <div key={type} className="mb-8 md:mb-12 lg:mb-20">
            <div className="mb-4 md:mb-6 px-2 md:px-4">
              <h2 className="text-lg md:text-xl lg:text-2xl text-white font-bold text-left">
                {video.name}
              </h2>
            </div>

            <div className="w-full">
              <div className="relative">
                <iframe
                  src={getYoutubeEmbedUrl(video.key)}
                  title={video.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[500px] sm:h-[500px] md:h-[500px] lg:h-[800px] xl:h-[800px] rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrailerList;
