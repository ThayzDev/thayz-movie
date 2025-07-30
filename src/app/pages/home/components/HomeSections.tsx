"use client";
import MovieSlider from "@/app/components/MovieSlider";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const SectionHeader = ({
  title,
  subtitle,
  icon,
  showViewMore = false,
  viewMorePath,
}: {
  title: string;
  subtitle?: string;
  icon?: string;
  showViewMore?: boolean;
  viewMorePath?: string;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleViewMore = () => {
    if (viewMorePath) {
      navigate(viewMorePath);
    }
  };

  return (
    <div className="mb-8 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
        {icon && (
          <span className="text-2xl sm:text-3xl lg:text-4xl">{icon}</span>
        )}
        {t(title)}
      </h2>
      {showViewMore && (
        <button
          onClick={handleViewMore}
          className="text-white bg-[#0f0f0f] border-2 border-white hover:bg-white hover:text-red-600 px-6 py-1 rounded-2xl text-lg font-medium transition-all duration-200"
        >
          {t("viewMore")}
        </button>
      )}
    </div>
  );
};

export const TrendingMoviesSection = ({
  movies,
  sliceLimit,
  onCardClick,
}: any) => (
  <section>
    <SectionHeader
      title="trendingMovies"
      showViewMore={true}
      viewMorePath="/movies?type=trending"
    />
    <div className="relative">
      <MovieSlider
        items={movies}
        isMovie={true}
        sliceLimit={sliceLimit}
        onCardClick={onCardClick}
      />
    </div>
  </section>
);

export const TopRatedMoviesSection = ({
  movies,
  sliceLimit,
  onCardClick,
}: any) => (
  <section>
    <SectionHeader
      title="topRatedMovies"
      showViewMore={true}
      viewMorePath="/movies?type=top_rated"
    />
    <div className="relative">
      <MovieSlider
        items={movies}
        isMovie={true}
        sliceLimit={sliceLimit}
        onCardClick={onCardClick}
      />
    </div>
  </section>
);

export const TrendingTVSection = ({
  tvSeries,
  sliceLimit,
  onCardClick,
}: any) => (
  <section>
    <SectionHeader
      title="trendingTVSeries"
      showViewMore={true}
      viewMorePath="/tv-series?type=trending"
    />
    <div className="relative">
      <MovieSlider
        items={tvSeries}
        isMovie={false}
        sliceLimit={sliceLimit}
        onCardClick={onCardClick}
      />
    </div>
  </section>
);

export const TopRatedTVSection = ({
  tvSeries,
  sliceLimit,
  onCardClick,
}: any) => (
  <section>
    <SectionHeader
      title="topRatedTVSeries"
      showViewMore={true}
      viewMorePath="/tv-series?type=top_rated"
    />
    <div className="relative">
      <MovieSlider
        items={tvSeries}
        isMovie={false}
        sliceLimit={sliceLimit}
        onCardClick={onCardClick}
      />
    </div>
  </section>
);
