"use client";

import ShowMoreButton from "@/app/components/ShowMoreButton/ShowMoreButton";
import { useTVSeriesHandlers } from "@/app/pages/tv-series/hooks/useTVSeriesHandlers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PageBanner from "../../components/Banner";
import SearchBar from "../../components/SearchBar/SearchBar";
import { TVSeries } from "../../types/tvSeries";
import { fetchTVSeries } from "../../utils/api";
import TVSeriesResults from "./components/TVSeriesResults";

const TVSeriesPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<string>("trending");
  const [inputValue, setInputValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allTVSeries, setAllTVSeries] = useState<TVSeries[]>([]);
  const [displayCount, setDisplayCount] = useState(25);

  const {
    data: tvSeries = [],
    isLoading: isLoadingTV,
    error: errorTV,
    isFetching,
  } = useQuery({
    queryKey: ["tvSeries", searchQuery, searchCategory, currentPage],
    queryFn: () => fetchTVSeries(searchCategory, searchQuery, currentPage),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: true,
    placeholderData: (previousData) => previousData,
    gcTime: 10 * 60 * 1000, // Giữ cache 10 phút
  });

  // Effect riêng để reset khi search query thay đổi
  useEffect(() => {
    if (currentPage === 1) {
      setAllTVSeries([]);
    }
  }, [searchQuery, searchCategory]);

  useEffect(() => {
    if (tvSeries !== undefined) {
      if (currentPage === 1) {
        // Luôn set lại allTVSeries khi currentPage = 1 (search mới hoặc reset)
        setAllTVSeries(tvSeries);
        setDisplayCount(25);
      } else if (tvSeries.length > 0) {
        setAllTVSeries((prev) => {
          const existingIds = new Set(prev.map((tv: TVSeries) => tv.id));
          const newTVSeries = tvSeries.filter(
            (tv: TVSeries) => !existingIds.has(tv.id)
          );
          return [...prev, ...newTVSeries];
        });
      }
    }
  }, [tvSeries, currentPage]);

  const { handleCardClick, handleSearch, handleInputChange, handleLoadMore } =
    useTVSeriesHandlers(
      setSearchQuery,
      setSearchCategory,
      setInputValue,
      setCurrentPage,
      setDisplayCount,
      displayCount,
      allTVSeries,
      tvSeries
    );

  const displayedTVSeries = allTVSeries.slice(0, displayCount);

  const canShowMore =
    displayCount < allTVSeries.length ||
    (tvSeries && tvSeries.length >= 20 && !isLoadingTV);

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <PageBanner title="TV Series" type="tv" />

      <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-15">
        <div className="search-section mt-15">
          <SearchBar
            onSearch={handleSearch}
            category="tv"
            onInputChange={handleInputChange}
            inputValue={inputValue}
          />
        </div>

        <div className="tv-series-section mt-8">
          <TVSeriesResults
            isLoading={
              (isLoadingTV && displayedTVSeries.length === 0) ||
              (isFetching && displayedTVSeries.length === 0)
            }
            error={errorTV}
            tvSeries={displayedTVSeries}
            handleCardClick={handleCardClick}
          />

          {canShowMore && (
            <ShowMoreButton
              onLoadMore={handleLoadMore}
              isFetching={isFetching}
              canShowMore={canShowMore}
              increment={25}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TVSeriesPage;
