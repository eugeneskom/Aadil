import React from 'react';
import SearchResultItem from './SearchResultItem';
import { Product } from '../../types/Product';

interface SearchResultsProps {
  results: Product[];
  onClick: () => void;
}


const SearchResults = ({ results, onClick }:SearchResultsProps) => {
  return (
    <div className="search-results">
      {results.map((product:Product) => (
        <SearchResultItem key={product.Id} product={product} onClick={onClick}/>
      ))}
    </div>
  );
};

export default SearchResults;