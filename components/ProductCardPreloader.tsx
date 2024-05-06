import React from 'react';

const ProductCardPreloader = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col product-card animate-pulse product-card">
      <div className="product-card__header">
        <div className="w-full h-64 bg-gray-300"></div>
      </div>
      <div className="p-4 flex-grow relative">
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
      <div className="p-4">
        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default ProductCardPreloader;