// Import all dependencies
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Actions
import { fetchWeatherData } from "../../store/weatherSlice";

// Import Styles
import { SearchForm, SearchInput, SearchButton } from "./Search.styles";

// Search Component
const Search = () => {
  const navigate = useNavigate();

  // Local state for the search query
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery !== "") {
      navigate(`/city/${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <SearchForm onSubmit={handleSearch}>
      <SearchInput
        type="text"
        value={query}
        onChange={({ target }) => setQuery(target.value)}
        placeholder="Search for a city..."
      />
      <SearchButton type="submit" disabled={query.trim() === ""}>Search</SearchButton>
    </SearchForm>
  );
};

// Export the Search Component
export default Search;