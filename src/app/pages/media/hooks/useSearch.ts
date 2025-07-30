import { useState } from "react";

export function useSearch(initialValue = "") {
  const [inputValue, setInputValue] = useState(initialValue);
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [forceSearch, setForceSearch] = useState(0);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSearch = (query: string, onSearchCallback?: () => void) => {
    setSearchQuery(query);
    setForceSearch((prev) => prev + 1);
    if (onSearchCallback) onSearchCallback();
  };

  return {
    inputValue,
    setInputValue,
    searchQuery,
    setSearchQuery,
    forceSearch,
    setForceSearch,
    handleInputChange,
    handleSearch,
  };
}
