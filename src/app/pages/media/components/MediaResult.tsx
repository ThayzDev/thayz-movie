import MovieCard from "@/app/components/MovieCard";
import { Movie } from "@/app/types/movie";
import { TVSeries } from "@/app/types/tvSeries";
import Skeleton from "react-loading-skeleton";

interface MediaResultProps {
  type: "movies" | "tv-series";
  items: Movie[] | TVSeries[];
  loading: boolean;
  displayCount: number;
  onCardClick: (item: Movie | TVSeries, itemType: "movie" | "tv") => void;
}

const MediaResult: React.FC<MediaResultProps> = ({
  type,
  items,
  loading,
  displayCount,
  onCardClick,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-x-0 gap-y-10 pb-16">
      {loading
        ? Array.from({ length: displayCount }).map((_, idx) => (
            <div key={idx} className="w-full h-80">
              <Skeleton height="100%" width="100%" />
            </div>
          ))
        : items
            .slice(0, displayCount)
            .map((item, idx) => (
              <MovieCard
                key={`${item.id}-${idx}`}
                item={item}
                isMovie={type === "movies"}
                onCardClick={() =>
                  onCardClick(item, type === "movies" ? "movie" : "tv")
                }
              />
            ))}
    </div>
  );
};

export default MediaResult;
