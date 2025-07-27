"use client";
import React from "react";
import { useEscClose, useTrailerKey } from "./hooks/useTrailerModalHooks";

interface TrailerModalProps {
  movieId: number;
  type: "movie" | "tv";
  onClose: () => void;
}

const TrailerModal: React.FC<TrailerModalProps> = ({
  movieId,
  type,
  onClose,
}) => {
  const trailerKey = useTrailerKey(movieId, type);
  useEscClose(onClose);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-2 sm:px-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#181818] rounded-xl p-0 w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[800px] h-[600px] flex flex-col items-center justify-center relative shadow-2xl">
        <button
          className="absolute top-1 right-2 text-white text-3xl hover:text-red-500 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 z-10"
          onClick={onClose}
        >
          ×
        </button>

        {trailerKey ? (
          <iframe
            className="w-[90%] max-w-[730px] h-[530px]"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ display: "block", margin: "0 auto" }}
          />
        ) : (
          <div className="text-white text-center flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
            Loading trailer...
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;
