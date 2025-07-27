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
    <div className="flex justify-center mt-8 pb-16">
      <button
        onClick={onLoadMore}
        disabled={isFetching}
        className="
          bg-gradient-to-r from-red-600 to-red-700 
          hover:from-red-700 hover:to-red-800 
          disabled:from-gray-800 disabled:to-gray-900 
          disabled:cursor-not-allowed 
          text-white font-bold py-4 px-10 
          rounded-xl 

          shadow-lg shadow-red-500/25
          transition-all duration-300 
          transform hover:scale-105
          relative overflow-hidden
          min-w-[200px]
        "
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-50"></div>
        <div className="relative flex items-center justify-center gap-3">
          {isFetching ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
