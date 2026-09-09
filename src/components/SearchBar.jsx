import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ query, onQueryChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="search-form">
      <div className="search-box">
        <Search size={18} color="green" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search a meal"
          className="search-input"
        />
      </div>
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}
