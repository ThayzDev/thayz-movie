"use client";
import MovieCard from "@/app/components/MovieCard";
import StatusMessage from "@/app/components/StatusMessage";
import { Movie } from "@/app/types/movie";

interface MovieResultsProps {
  isLoading: boolean;
  error: unknown;
  movies: Movie[];
  handleCardClick: (movie: Movie) => void;
}

const MovieResults = ({
  isLoading,
  error,
  movies,
  handleCardClick,
}: MovieResultsProps) => {
  if (isLoading || error) {
    return (
      <StatusMessage
        loading={isLoading}
        error={error}
        loadingText="Loading movies..."
        errorText="Error loading movies"
      />
    );
  }

  if (movies.length === 0) {
    return <StatusMessage notFound notFoundText="No movies found" />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-x-1 gap-y-10 pb-16">
      {movies.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          item={movie}
          isMovie={true}
          onCardClick={() => handleCardClick(movie)}
        />
      ))}
    </div>
  );
};

export default MovieResults;
