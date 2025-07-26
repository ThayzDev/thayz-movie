"use client";
interface NoMoreResultsProps {
  show: boolean;
  itemType?: "movies" | "tv-series";
  itemCount: number;
}

const NoMoreResults = ({
  show,
  itemType = "movies",
  itemCount,
}: NoMoreResultsProps) => {
  if (!show || itemCount === 0) return null;

  const emoji = itemType === "tv-series" ? "📺" : "🎬";
  const text = itemType === "tv-series" ? "TV series" : "movies";

  return (
    <div className="text-center py-8">
      <div className="bg-gradient-to-r from-red-900/20 to-black/20 border border-red-800/30 rounded-lg px-6 py-4 inline-block">
        <p className="text-red-400 font-semibold">
          {emoji} All {text} loaded
        </p>
        <p className="text-gray-500 text-sm mt-1">
          You&apos;ve reached the end of the list
        </p>
      </div>
    </div>
  );
};

export default NoMoreResults;
