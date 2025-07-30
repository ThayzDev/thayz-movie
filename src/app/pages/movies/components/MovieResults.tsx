"use client";
import MovieCard from "@/app/components/MovieCard";
import StatusMessage from "@/app/components/StatusMessage";
import { Movie } from "@/app/types/movie";
import { TVSeries } from "@/app/types/tvSeries";

interface MovieResultsProps {
  isLoading: boolean;
  error: unknown;
  items: (Movie | TVSeries)[];
  handleCardClick: (item: Movie | TVSeries) => void;
  contentType: "movie" | "tv";
}

const MovieResults = ({
  isLoading,
  error,
  items,
  handleCardClick,
  contentType,
}: MovieResultsProps) => {
  // Debug: log số lượng items và trạng thái loading/error
  console.log("[MovieResults]", {
    isLoading,
    error,
    itemsLength: items.length,
    items,
    contentType,
  });

  if (isLoading || error) {
    return (
      <StatusMessage
        loading={isLoading}
        error={error}
        loadingText={`Loading ${
          contentType === "movie" ? "movies" : "TV series"
        }...`}
        errorText={`Error loading ${
          contentType === "movie" ? "movies" : "TV series"
        }`}
      />
    );
  }

  if (items.length === 0) {
    return (
      <StatusMessage
        notFound
        notFoundText={`No ${
          contentType === "movie" ? "movies" : "TV series"
        } found`}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-x-1 gap-y-10 pb-16">
      {items.map((item: Movie | TVSeries) => (
        <MovieCard
          key={item.id}
          item={item}
          isMovie={contentType === "movie"}
          onCardClick={() => handleCardClick(item)}
        />
      ))}
    </div>
  );
};

export default MovieResults;
