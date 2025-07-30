"use client";
import React from "react";
import { useTranslation } from "react-i18next";

interface SearchInputProps {
  query: string;
  isFocused: boolean;
  category: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClear: () => void;
  isLoading?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  query,
  isFocused,
  category,
  onInputChange,
  onFocus,
  onBlur,
  isLoading,
}) => {
  const { t } = useTranslation();
  return (
    <div className="relative flex items-center w-full  mx-auto">
      <div
        className={`relative flex items-center bg-black backdrop-blur-sm rounded-full  transition-all duration-300 w-full ${
          isFocused
            ? "border-gray-600 shadow-lg shadow-black/30"
            : "border-gray-700 hover:border-gray-600"
        }`}
      >
        <input
          type="text"
          value={query}
          onChange={onInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={t("search.placeholder")}
          className="w-full pl-7 pr-28 py-2 bg-transparent text-white placeholder-gray-500 focus:outline-none text-semibold font-medium"
        />

        <button
          type="submit"
          className="absolute right-2 px-7 py-[4px] bg-red-600 hover:bg-red-600 text-white  rounded-full transition-all duration-300 font-semibold text-lg shadow-[0_0_7px_8px_rgba(255,0,0,0.4)] hover:shadow-[0_0_12px_14px_rgba(255,0,0,0.5)] transform hover:scale-105 focus:outline-none flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
          ) : null}
          {t("search.button")}
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
