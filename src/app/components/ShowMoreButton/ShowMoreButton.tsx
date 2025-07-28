"use client";
interface ShowMoreButtonProps {
  onLoadMore: () => void;
  isFetching: boolean;
  canShowMore: boolean;
  increment?: number;
}

const ShowMoreButton = ({
  onLoadMore,
  isFetching,
  canShowMore,
}: ShowMoreButtonProps) => {
  if (!canShowMore) return null;

  return (
    <div className="flex justify-center pb-20">
      <button
        onClick={onLoadMore}
        disabled={isFetching}
        className="
          bg-[#0f0f0f]
          text-white font-bold py-1 px-8
          rounded-3xl 
          border-2 border-white hover:bg-white hover:text-red-600
          transition-all duration-300 
          transform hover:scale-105
          relative overflow-hidden
          
        "
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-50"></div>
        <div className="relative flex items-center justify-center gap-3">
          {isFetching ? (
            <>
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg">Loading...</span>
            </>
          ) : (
            <>
              <span className="text-lg font-semibold">Watch More</span>
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default ShowMoreButton;
