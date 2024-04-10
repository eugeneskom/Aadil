import React from "react";
import SearchResultItem from "./SearchResultItem";
import { Product } from "../../types/Product";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

interface SearchResultsProps {
  onClick: () => void;
}

const SearchResults = ({ onClick }: SearchResultsProps) => {
  const results = useSelector((state: RootState) => state.search.searchResults);

  return (
    <div className="search-results">
      {results.map((product: Product) => (
        <SearchResultItem key={product.Id} product={product} onClick={onClick} />
      ))}
    </div>
  );
};

export default SearchResults;
