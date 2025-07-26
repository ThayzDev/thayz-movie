"use client";

import React from "react";
import SearchInput from "./components/SearchInput";
import { useSearchBar } from "./hooks/useSearchBar";

interface SearchBarProps {
  onSearch: (query: string, category: string) => void;
  category: string;
  onInputChange?: (value: string) => void;
  inputValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const {
    query,
    isFocused,
    handleInputChange,
    handleSubmit,
    handleClear,
    handleFocus,
    handleBlur,
  } = useSearchBar(props);

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
        />
      </form>
    </div>
  );
};

export default SearchBar;
