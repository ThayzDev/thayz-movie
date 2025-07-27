"use client";
import MovieSlider from "@/app/components/MovieSlider";
import { Movie } from "@/app/types/movie";
import { TVSeries } from "@/app/types/tvSeries";

interface SimilarProps {
  similarItems: (Movie | TVSeries)[];
  isMovie: boolean;
  onCardClick?: (item: Movie | TVSeries) => void;
}

const Similar = ({ similarItems, isMovie, onCardClick }: SimilarProps) => {
  if (!similarItems || similarItems.length === 0) return null;

  return (
    <div className="px-4 md:px-10 lg:px-16 xl:px-20 py-6 md:py-8 select-none">
      <div className="flex items-center mb-4 md:mb-6">
        <h2 className="text-white text-xl md:text-2xl font-bold">Similar</h2>
      </div>

      <MovieSlider
        items={similarItems}
        isMovie={isMovie}
        sliceLimit={18}
        onCardClick={onCardClick || (() => {})}
      />
    </div>
  );
};

export default Similar;
