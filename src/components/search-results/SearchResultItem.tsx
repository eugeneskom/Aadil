import React, { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { NavLink } from 'react-router-dom';

interface SearchResultItemProps {
  product: Product;
  onClick: () => void;
}

const SearchResultItem = ({ product,onClick }:SearchResultItemProps) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(true);

  useEffect(() => {
    // Checking if the image URL is valid, if not, the product card won't be rendered
    const img = new Image();
    img.src = product.ImageUrl;
    img.onload = () => setImageIsLoaded(true);
    img.onerror = () => setImageIsLoaded(false);
  }, [product.ImageUrl]);

  if (!imageIsLoaded) {
    return null; // Don't render the product if the image is broken
  }

  return (
    <NavLink to={`/product-page/${product.Id}`} className="search-result" onClick={onClick}>
      <img src={product.ImageUrl} alt={product.Name} className="search-result__image" />
      <div className="search-result__info">
        <h3 className="search-result__name">{product.Name}</h3>
        <p className="search-result__price">${product.CurrentPrice}</p>
      </div>
    </NavLink>
  );
};

export default SearchResultItem;