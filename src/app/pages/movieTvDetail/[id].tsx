"use client";

import StatusMessage from "@/app/components/StatusMessage";
import DetailBanner from "./components/DetailBanner";
import Similar from "./components/Similar";
import TrailerList from "./components/Trailer";
import { useMovieDetail } from "./hooks/useMovieDetail";

const DetailsPage = () => {
  const { data, isLoading, error, type, handleSimilarClick } = useMovieDetail();

  if (isLoading) {
    return <StatusMessage loading loadingText="Loading movie details..." />;
  }

  if (error) {
    return (
      <StatusMessage error={error} errorText="Failed to load movie details" />
    );
  }

  const { similar } = data || {};

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <DetailBanner movie={data} />
      <TrailerList />
      <Similar
        similarItems={similar?.results || []}
        isMovie={type === "movie"}
        onCardClick={handleSimilarClick}
      />
    </div>
  );
};

export default DetailsPage;
