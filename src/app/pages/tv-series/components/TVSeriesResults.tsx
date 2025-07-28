"use client";

import StatusMessage from "@/app/components/StatusMessage";
import MovieCard from "../../../components/MovieCard";
import { TVSeries } from "../../../types/tvSeries";

interface TVSeriesResultsProps {
  isLoading: boolean;
  error: unknown;
  tvSeries: TVSeries[];
  handleCardClick: (tv: TVSeries) => void;
}

const TVSeriesResults = ({
  isLoading,
  error,
  tvSeries,
  handleCardClick,
}: TVSeriesResultsProps) => {
  if (isLoading) {
    return <StatusMessage loading loadingText="Loading TV series..." />;
  }

  if (error) {
    return <StatusMessage error={error} errorText="Error loading TV series" />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-x-1 gap-y-10 pb-16 ">
      {tvSeries.map((tv: TVSeries) => (
        <MovieCard
          key={tv.id}
          item={tv}
          isMovie={false}
          onCardClick={() => handleCardClick(tv)}
        />
      ))}
    </div>
  );
};

export default TVSeriesResults;
