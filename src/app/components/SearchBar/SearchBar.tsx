"use client";

import React, { useState } from "react";
import SearchInput from "./components/SearchInput";
import { useSearchBar } from "./hooks/useSearchBar";

interface SearchBarProps {
  onSearch: (query: string, category: string) => void;
  category: string;
  onInputChange?: (value: string) => void;
  inputValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    query,
    isFocused,
    handleInputChange,
    handleSubmit: baseHandleSubmit,
    handleClear,
    handleFocus,
    handleBlur,
  } = useSearchBar({
    ...props,
    onSearch: (...args) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        props.onSearch(...args);
      }, 300);
    },
  });

  // Custom handleSubmit to show loading spinner
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      baseHandleSubmit(e);
    }, 300);
  };

  return (
    <div className="w-full max-w-lg  ">
      <form onSubmit={handleSubmit} className="relative">
        <SearchInput
          query={query}
          isFocused={isFocused}
          category={props.category}
          onInputChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClear={handleClear}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
};

export default SearchBar;
